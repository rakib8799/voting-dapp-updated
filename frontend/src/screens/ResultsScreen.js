import CandidatesResultList from '../components/CandidatesResultList ';
import Login from '../components/Login';

function ResultsScreen() {
  return (
    <div className="flex">
      <Login />
      <CandidatesResultList
        results={true}
        greeting="Hello User"
        instruction="The results of the election is out "
      />
    </div>
  );
}

export default ResultsScreen;
