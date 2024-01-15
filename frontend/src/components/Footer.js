import LogoandTitle from "./LogoandTitle";
function Footer() {
  return (
    <div className="bg-blue-300  h-40 2xl:h-44 w-full flex text-center mt-12 2xl:mt-32 ">
      {/* <h1 className="m-auto text-lg font-light font-serif">
        About Us
      </h1>
      <h1 className="m-auto text-lg font-light font-serif">
        Contact Us
      </h1>
      <h1 className="m-auto text-lg font-light font-serif">
        Collaborate
      </h1>
      <h1 className="m-auto text-lg font-light font-serif">
        Socials
      </h1> */}
      <div className="mx-auto">
        <div className=" mr-28 ">
          <LogoandTitle />
        </div>
        <p className="py-4 ">© 2023 E-Voting All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
