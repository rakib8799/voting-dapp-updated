import CandidateInputs from "../components/CandidateInputs";
import Login from "../components/Login";
import NextPageButton from "../components/NextPageButton";
import SideProgress from "../components/SideProgress";
import candidatespic from "../pics/candidatespic.png";
function AddCandidatesScreen() {
  return (
    <div>
      <Login />
      <div className="flex w-full ">
        <SideProgress color={"bg-gray-400"} progress={1} />
        <CandidateInputs />
        <img
          src={candidatespic}
          alt="candidatesdemopic"
          className="  object-fill h-96 mt-24 ml-12"
        />
      </div>
      <div className=" float-right mt-20  mr-80 mb-24">
        <NextPageButton
          content={"Next Step"}
          path="/organizerdefault/scheduleelection"
        />
      </div>
    </div>
  );
}

export default AddCandidatesScreen;
