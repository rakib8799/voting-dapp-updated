import { useEffect } from 'react';
import { useCandidatesList } from '../custom-hooks/useCandidatesList';
import votingpic from '../pics/voting.png';
import CandidateList from './CandidateList';

function CandidatesResultList(props) {
  const { currentOrganizer, candidatesInfoList, displayCandidatesInfo } =
    useCandidatesList(true);
  useEffect(() => {
    displayCandidatesInfo();
  }, [displayCandidatesInfo]);

  return (
    <div className=" w-[91%] ml-5 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          {props.greeting}
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          {props.instruction}
        </p>
      </div>
      {candidatesInfoList.map((candidate, key) => {
        return (
          <div className="flex w-full" key={key}>
            <CandidateList
              name={candidate.name}
              address={candidate.address}
              position={candidate.position}
              party={candidate.party}
              votes={candidate.votes}
              results={props.results}
              organizer={currentOrganizer}
              isWinner={
                /* eslint-disable-next-line eqeqeq*/
                localStorage.getItem('highest') == candidate.votes ? 'Y' : 'N'
              }
            />
            <img
              src={votingpic}
              alt="voting pic"
              className="  object-fill  h-20 ml-24  mt-12 "
              key={`${key}-img`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CandidatesResultList;
