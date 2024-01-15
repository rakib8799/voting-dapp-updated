import canvas, { Canvas, Image } from "canvas";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import faceapi from "face-api.js";
import fs from "fs";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import twilio from "twilio";
import Contract from "./models/Contracts.js";
dotenv.config();
faceapi.env.monkeyPatch({ Canvas, Image });

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const __dirname = path.resolve();
// console.log(__dirname);
//Image Recognition and Processing
LoadModels();
async function LoadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(
    __dirname + "/models/models"
  );
  await faceapi.nets.faceRecognitionNet.loadFromDisk(
    __dirname + "/models/models"
  );
}

// Promise.all([
//   faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models/models"),
//   faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models/models"),
//   faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models/models"),
// ]).then(async () => {
//   // get labeled face descriptions once models are loaded
//   await uploadLabeledImages();
// });

const faceSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);
async function uploadLabeledImages(images, label) {
  try {
    // LoadModels();
    let counter = 0;
    const descriptions = [];
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = (i / images.length) * 100;
      console.log(`Progress = ${counter}%`);
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }
    const createFace = new FaceModel({
      label: label,
      descriptions: descriptions,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function getDescriptorsFromDB(image) {
  // LoadModels();
  let faces = await FaceModel.find();
  // eslint-disable-next-line no-undef
  for (let i = 0; i < faces.length; i++) {
    // eslint-disable-next-line no-undef
    for (let j = 0; j < faces[i].descriptions.length; j++) {
      // eslint-disable-next-line no-undef
      faces[i].descriptions[j] = new Float32Array(
        // eslint-disable-next-line no-undef
        Object.values(faces[i].descriptions[j])
      );
    }
    // eslint-disable-next-line no-undef
    faces[i] = new faceapi.LabeledFaceDescriptors(
      // eslint-disable-next-line no-undef
      faces[i].label,
      // eslint-disable-next-line no-undef
      faces[i].descriptions
    );
  }
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}
const extractFeaces = async (image) => {
  // LoadModels();
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const out = faceapi.createCanvasFromMedia(img);
  faceapi.matchDimensions(out, displaySize);
  const ctx = out.getContext("2d");
  resizedDetections.forEach((detection) => {
    const box = detection.detection.box;
    ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, 200, 200);
  });
  return out.toBuffer("image/jpeg");
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./img")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage })

app.post("/post-face", upload.single('file'), async (req, res) => {
  const File1 = req?.file?.path;
  // console.log(File1);
  const label = req?.body?.label;
  let faces = await extractFeaces(__dirname + "/" + File1);
  fs.writeFileSync(__dirname + "/img/face.jpg", faces);

  // let result = await uploadLabeledImages(
  //   [File1, File2, File3, File4, File5, File6],
  //   label
  // );

  let result = await uploadLabeledImages(
    [
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
      __dirname + "/img/face.jpg",
    ],
    label
  );
  fs.readdir(__dirname + "/tmp", (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(__dirname + "/tmp", file), (err) => {
        if (err) throw err;
      });
    }
  });

  // fs.unlink(__dirname + "/img/face.jpg", (err) => {
  //   if (err) throw err;
  // });

  if (result) {
    res.json({ message: "Face data stored successfully" });
  } else {
    res.json({ message: "Something went wrong, please try again." });
  }
});

app.post("/check-face", upload.single('file'), async (req, res) => {
  const File1 = req?.body?.file;
  // console.log(File1);
  let result = await getDescriptorsFromDB(File1);
  res.json({ result });
});

//init contract
app.post("/init-contract", async (req, res) => {
  try {
    const { email } = req.body;
    const contract = new Contract({ email, contract: [] });
    const user = await Contract.findOne({ email });
    if (user) {
      res.status(200).json(user);
      return;
    }
    contract.save();
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//add contract
app.post("/add-contract", async (req, res) => {
  try {
    const { email, contract, name } = req.body;
    const user = await Contract.findOne({ email });
    const contractExists = user.contract.find((item) => item === contract);
    if (contractExists) {
      res.status(200).json(user);
      return;
    }
    user.contract.push({
      contract,
      name,
      date: new Date().toLocaleDateString(),
      status: "Not Started",
    });
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get contract
app.post("/get-contract", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Contract.findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//update contract
app.put("/update-contract", async (req, res) => {
  const { email, contract, status } = req.body;
  try {
    const user = await Contract.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const index = user.contract.findIndex((item) => item.contract === contract);
    if (index === -1) {
      return res.status(404).json({ error: "Contract not found" });
    }

    user.contract[index].status = status;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Delete contract
app.delete("/delete-contract", async (req, res) => {
  const { contract, email } = req.body;

  try {
    const user = await Contract.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const index = user.contract.findIndex((item) => item.contract === contract);

    if (index === -1) {
      return res.status(404).json({ error: "Contract not found" });
    }

    user.contract.splice(index, 1);
    await user.save();
    res.status(200).json({
      message: "Contract deleted successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Get recent contracts
app.get("/recent-contracts", async (req, res) => {
  try {
    const users = await Contract.find();
    let contracts = [];
    users.forEach((user) => {
      contracts.push(...user.contract);
    });
    contracts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    contracts = contracts.slice(0, 20);
    contracts = contracts.reverse();
    res.status(200).json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Send sms Message
app.post("/send", (req, res) => {
  const { number, message } = req.body;
  client.messages
    .create({
      body: message,
      from: "+8801727027277",
      to: `+88${number}`,
    })
    .then((message) => {
      res.status(200).json({ message: "Message sent successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Message not sent" });
    });
});

const PORT = process.env.SERVER_PORT || 5000;
// eslint-disable-next-line no-undef
app.listen(PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Server is running on port ${PORT}`);
  mongoose
    // eslint-disable-next-line no-undef
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    });
});
