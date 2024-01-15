import { Link } from "react-router-dom";
function NextPageButton(props) {
  return (
    <div>
      <Link to={props.path}>
        <button className="rounded-none bg-blue-200 h-16 w-60 text-2xl mt-10 ml-32 text-center font-serif shadow-md shadow-blue-300">
          {props.content}
        </button>
      </Link>
    </div>
  );
}

export default NextPageButton;
