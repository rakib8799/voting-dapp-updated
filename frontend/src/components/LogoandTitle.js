import { Link } from "react-router-dom";
import logo from "../pics/logoVoting.png";
function LogoandTitle() {
  return (
    <div className="flex mt-6 ml-6   ">
      <img
        src={logo}
        alt="logo pic"
        className=" ml-10 object-scale-down h-12 w-28 "
      />
      <Link to="/">
        <h1 className=" mt-2 text-4xl font-mono title text-gray-800">
          E-Voting
        </h1>
      </Link>
    </div>
  );
}

export default LogoandTitle;
