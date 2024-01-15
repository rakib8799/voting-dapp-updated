import ElectionSchedule from "../components/ElectionSchedule";
import Login from "../components/Login";
import SideProgress from "../components/SideProgress";
import schedulepic from "../pics/schedulepic.png";
function ScheduleElection() {
  return (
    <div>
      <Login />
      <div className="flex w-full ">
        <SideProgress progress={2} color={"bg-blue-300"} />
        <ElectionSchedule />
        <img
          src={schedulepic}
          alt="candidatesdemopic"
          className="  object-fill  h-64 mt-44  ml-5 mb-28"
        />
      </div>
    </div>
  );
}

export default ScheduleElection;
