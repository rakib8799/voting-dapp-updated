import CandidatesList from '../components/CandidatesList';
import Login from '../components/Login';

function VotingScreen() {
  return (
    <div className="flex">
      <Login />
      <CandidatesList
        results={false}
        greeting="Hello Voter"
        instruction=" Start Voting to your preferred candidate"
      />
    </div>
  );
}

export default VotingScreen;
