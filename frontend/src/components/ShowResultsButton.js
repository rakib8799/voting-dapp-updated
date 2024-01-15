import { ethers } from "ethers";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ABI } from "../Abi";
import { AppContext } from "../App";
function ShowResultsButton(props) {
  const navigate = useNavigate();
  const { setCandidatesInfoList, setCurrentOrganizer } = useContext(AppContext);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x93416a52e18009aF623AB60FEEb6ED2386c77B56";

  function navigateTo() {
    navigate(props.path);
  }

  async function showResults() {
    try {
      setCurrentOrganizer(props.organizer);
      setCandidatesInfoList([]);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      const { totalCandidates } = await contract.displayCandidateDetails(
        props.organizer,
        0
      );
      const length = totalCandidates.toNumber();
      let candidatesList = [];
      for (let index = 0; index < length; index++) {
        let { name, candidateAddress, position, party, votesGained } =
          await contract.displayCandidateDetails(props.organizer, index);
        console.log(name, candidateAddress, position, party, votesGained);
        candidatesList.push({
          name: name,
          address: candidateAddress,
          position: position,
          party: party,
          votes: votesGained,
        });
      }
      setCandidatesInfoList(candidatesList);
      navigateTo();
    } catch (error) {
      console.log("Err at showResult()", error);
    }
  }
  return (
    <div>
      {" "}
      <button
        className="rounded-none bg-blue-900 h-16 w-60 text-2xl mt-10 ml-32 text-center shadow-md shadow-blue-400 font-serif text-white"
        onClick={() => {
          showResults();
        }}
      ></button>
    </div>
  );
}

export default ShowResultsButton;
