import Button from './Button';

function ElectionSchedule() {
  const organizerConnected = localStorage.getItem('connected address');

  return (
    <div>
      <div className="w-full mb-16  text-center mt-40  ">
        <div className="  mt-2 ">
          <h1 className="text-4xl font-sans mt-10 intro">
            Dear Organizer
          </h1>
          <h2 className="text-2xl font-sans mt-10  intro">
            You have added the candidates for your election
          </h2>
          <p className="text-1xl font-sans mt-2  intro">
            Click on Start Election to start the election. You can end the
            election anytime...!
          </p>

          <h1 className="mt-4   ml-5 px-2  font-sans font-light intro text-2xl text-gray-600">
            Organizer: {organizerConnected}
          </h1>
        </div>
      </div>
      <div className=" ml-52">
        <Button
          content={'Start Election'}
          color="blue"
          path="/electionconfirmation"
          confirmstart={true}
        />
      </div>
    </div>
  );
}

export default ElectionSchedule;
