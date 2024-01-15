import axios from "axios";
import { useState } from "react";
import Camera from "./Camera";

function VotersRegistrationScreen() {
    const REACT_APP_PINATA_API = '23b0b96f5af3e6cd4772';
    const REACT_APP_PINATA_SECRET = '1fba8e15dcbc99ba2d834e5a369b3eb35f6c82128380ab66d9e9b43ee617a5bb';
    const [registering, setRegistering] = useState(false);
    const [openCamera, setOpenCamera] = useState(false);
    // const [fileImgUrl, setFileImgUrl] = useState("");
    // const [currentPic, setCurrentPic] = useState("");


    const [voterData, setVoterData] = useState({
        name: "",
        phone_number: "",
        email: "",
        voter_id: "",
        current_picture: "",
        voterId_number: "",
    });

    const handleVoterDataChange = (e) => {
        setVoterData({
            ...voterData,
            [e.target.name]: e.target.value,
        });
        // console.log(voterData);
    };

    const sendFileToIPFS = async (fileImg) => {
        try {
            const formData = new FormData();
            formData.append("file", fileImg);
            const resFile = await axios({
                method: "POST",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    pinata_api_key: REACT_APP_PINATA_API,
                    pinata_secret_api_key: REACT_APP_PINATA_SECRET,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("File Uploaded to IPFS: ");
            console.log(resFile.data.IpfsHash);
            return resFile?.data?.IpfsHash;
        } catch (error) {
            console.log("Error sending File to IPFS: ");
            console.log(error);
        }
    };

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const registerAsVoter = async (event) => {
        event.preventDefault();
        setRegistering(!registering);

        console.log("Registering as voter");
        const current_modified_picture = await sendFileToIPFS(
            dataURLtoFile(voterData?.current_picture, "image.png")
        );
        const current_modified_voterId = await sendFileToIPFS(voterData?.voter_id);
        console.log("current_modified_voterId", current_modified_voterId);
        console.log("current_modified_picture", current_modified_picture);

        //send one fileto backend
        // let verified = false;
        const formData = new FormData();
        formData.append("file", voterData?.voter_id);
        formData.append("label", voterData?.email);
        // const data = { file: voterData?.voter_id, label: voterData?.email };
        // data.append("file", voterData?.voter_id);
        // data.append("label", voterData?.email);
        // console.log(event.target);
        // console.log(formData);
        await axios
            .post("http://localhost:5000/post-face", formData
                // , {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // }
            )
            .then((res) => {
                if (res.data.message !== "Face data stored successfully") {
                    alert(res.data.message + " Please try again");
                    window.location.reload();
                    return;
                }
                // console.log(res);
            }).catch((err) => {
                alert("Face not verified , Please try again");
                window.location.reload();
                // console.log(err);
            });


        // const newFormData = new FormData();
        // newFormData.append("file", voterData?.current_picture);
        const newFormData = new FormData();
        newFormData.append("file", voterData?.current_picture);
        console.log(voterData?.current_picture);
        // console.log(newFormData);
        await axios
            .post("http://localhost:5000/check-face", newFormData
                // , {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // }
            )
            .then(async (res) => {
                // if (res.data.result[0].label === voterData?.email) {
                //     verified = true;
                //     await axios
                //         .post("http://localhost:5000/send", {
                //             number: "+88" + voterData?.phone_number,
                //             message:
                //                 "You have been successfully registered as a voter, You can vote now",
                //         })
                //         .then((res) => {
                //             console.log(res);
                //         })
                //         .catch((err) => {
                //             console.log(err);
                //             window.location.reload();
                //         });
                // }
                console.log(res);
            })
            .catch((err) => {
                alert("Face not verified , Please try again");
                window.location.reload();
            });
    };

    return (
        <div
            className="container-main text-center p-4 "
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   justifyContent: "center",
        //   alignItems: "center",
        // }}
        >
            {/* <h3 className="font-bold text-7xl mb-4">Registration</h3> */}
            <small className="text-5xl mt-4">Register to vote.</small>
            <div
                className="container-item"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <form
                    className="form mb-16"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                    }}
                    onSubmit={registerAsVoter}
                >
                    {/* <div
                        className="div-li"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <label
                            className={"label-r"}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            Account Address
                            <input
                                className={"input-r"}
                                type="text"
                                value={
                                    account
                                        ? account.substring(0, 6) +
                                        "..." +
                                        account.substring(account.length - 6)
                                        : ""
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px 20px",
                                    margin: "8px 0",
                                    boxSizing: "border-box",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    backgroundColor: "#f8f8f8",
                                    color: "black",
                                    cursor: "not-allowed",
                                }}
                            />{" "}
                        </label>
                    </div> */}
                    <div
                        className="text-left w-1/2 bg-[#c9c9c9] p-4"
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            color: "black",
                        }}
                    >
                        <div className="block p-2">
                            <label htmlFor="name" className="block">
                                Name<span className="text-[#0168CF]">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full p-2 outline-none"
                                id="name"
                                placeholder="eg. Jhon Doe"
                                name="name"
                                value={voterData.name}
                                onChange={handleVoterDataChange}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                        <div className="block p-2">
                            <label htmlFor="phone_number" className="block">
                                Number<span className="text-[#0168CF]">*</span>
                            </label>
                            <input
                                required
                                type="number"
                                className="w-full p-2 outline-none"
                                id="phone_number"
                                placeholder="eg. 9841234567"
                                name="phone_number"
                                value={voterData.phone_number}
                                onChange={handleVoterDataChange}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                        <div className="block p-2">
                            <label htmlFor="email" className="block">
                                Email<span className="text-[#0168CF]">*</span>
                            </label>
                            <input
                                required
                                type="email"
                                className="w-full p-2 outline-none"
                                id="email"
                                placeholder="eg. abc@gmail.com"
                                name="email"
                                value={voterData.email}
                                onChange={handleVoterDataChange}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                        <div className="block p-2 items-center">
                            <label htmlFor="file" className="block">
                                Submit Voter ID<span className="text-[#0168CF]">*</span>
                            </label>
                            <input
                                required
                                type="file"
                                className="w-full p-2 outline-none"
                                id="file"
                                placeholder="eg. abc@gmail.com"
                                name="voter_id"
                                onChange={(e) => {
                                    //only image files are allowed
                                    // console.log(e.target.files)
                                    if (e.target.files[0].type.includes("image")) {
                                        setVoterData({
                                            ...voterData,
                                            voter_id: e.target.files[0],
                                        });
                                    } else {
                                        setVoterData({
                                            ...voterData,
                                            voter_id: "",
                                        });

                                        alert("Only image files are allowed");
                                    }
                                }}
                            />
                        </div>
                        <div className="block p-2 items-center">
                            <label htmlFor="voter_number" className="block">
                                Voter ID Number<span className="text-[#0168CF]">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full p-2 outline-none"
                                id="voter_number"
                                placeholder="eg. XXXXXXXXX"
                                name="voterId_number"
                                value={voterData.voterId_number}
                                onChange={handleVoterDataChange}
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <span
                                className="font-medium px-4 py-1 ml-2 rounded-2xl bg-[#0168CF] text-white cursor-pointer
                      hover:bg-[#0168CF] hover:text-white"
                                onClick={() => setOpenCamera(!openCamera)}
                            >
                                {!openCamera ? "📷 Took picture" : "📷 Close camera"}
                            </span>
                            {openCamera && (
                                <Camera
                                    setVoterData={setVoterData}
                                    voterData={voterData}
                                />
                            )}
                        </div>
                        <div className="mt-5">
                            <button className="btn-primary" type="submit">Register</button>
                        </div>
                        {/* <Button
                            content="Login as Voter"
                            path="/voterdefault"
                            color="blue"
                            forElectionList={true}
                            voterlogin={true}
                        // voterData={voterData}
                        /> */}
                    </div>

                    {/* {registering ? (
                        <Loader className="mb-8 text-sm" />
                    ) : (
                        <button
                            className="my-4 w-1/2 border-x border-y rounded-2xl p-2 font-semibold space-x-2 cursor-pointer border-[#0168CF] text-[#5c5b5b] hover:bg-[#0168CF] hover:text-white"
                            disabled={
                                voterData?.name?.length === 0 ||
                                voterData?.email?.length === 0 ||
                                voterData?.phone_number?.length === 0 ||
                                voterData?.voter_id?.length === 0 ||
                                voterData?.voterId_number?.length === 0 ||
                                voterData?.current_picture?.length === 0 ||
                                voterData?.phone_number?.length !== 11 ||
                                currentVoter["isRegistered"]
                            }
                            type="submit"
                        >
                            {currentVoter["isRegistered"]
                                ? "Registered"
                                : "🗳️ Register as voter 🗳️"}
                        </button>
                    )} */}
                    {/* {registering && <h1><Loader/></h1>} */}
                </form>
            </div>
        </div>
    );
}

export default VotersRegistrationScreen;
