import { useContext, useState } from 'react';
import { AppContext } from '../App';
import Button from './Button';
function CandidateInputs() {
  const { name, age, candidateParty, position, address } = useContext(AppContext);
  // console.log(position);
  const [val, setVal] = useState('');
  const [valSymbol, setValSymbol] = useState('');

  const changeFunc = (e) => {
    setVal(e.target.value);
  }
  const changeSymFunc = (e) => {
    setValSymbol(e.target.value);
  }
  const data = ['President', 'Vice President', 'General Member', 'Others'];
  const dataSym = ['Elephant', 'Bird', 'Umbrella', 'Boat', 'Lion'];
  return (
    <div className="w-1/3 ml-10 ">
      <div className="  mt-2 ">
        <h1 className="text-4xl font-sans mt-10 ml-20 intro">
          Hello Organizer
        </h1>
        <p className="text-1xl font-sans mt-2 ml-20 intro">
          Start your election now by setting up candidates{' '}
        </p>
      </div>
      <div className="h-96  mt-12 ml-5 w-full">
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Name"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none"
            ref={name}
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Age"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none"
            ref={age}
          />
        </div>
        <div className="mt-6">
          <input
            placeholder="Enter The Candidate's Account Address"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none"
            ref={address}
          />
        </div>
        <div className="mt-6">
          <select
            // placeholder="Enter The Candidate's Position"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none" value={val} onChange={changeFunc}
          >
            <option value="">Please select the Candidate's Position</option>
            {
              data.map((opt, id) => <option key={id}>{opt}</option>)
            }
          </select>
          {/* <input type="text" readOnly value={val} ref={position} /> */}
        </div>
        <div className="mt-6">
          {/* <label>The Candidate's Position is: */}
          <input type='hidden'
            placeholder="Enter The Candidate's Position"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none"
            value={val} ref={position}
          />
          {/* </label> */}
        </div>
        <div className="mt-6">
          <select
            // placeholder="Enter The Candidate's Position"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none" value={valSymbol} onChange={changeSymFunc}
          >
            <option value="">Please select the Candidate's Symbol</option>
            {
              dataSym.map((opt, id) => <option key={id}>{opt}</option>)
            }
          </select>
        </div>
        <div className="mt-6">
          {/* <label>The Candidate's Symbol is: */}
          <input type='hidden'
            placeholder="Enter The Candidate's Symbol"
            className="w-full h-16 px-4 bg-slate-100 focus:outline-none"
            readOnly value={valSymbol} ref={candidateParty}
          />
          {/* </label> */}
        </div>

        {/* <div className="mt-6">
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
        </div> */}

        <div className="mt-12 ml-16">
          <Button
            content={'Add Candidate'}
            color="blue"
            path="/organizerdefault/addcandidates"
            addcandidate={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CandidateInputs;
