import Button from '../components/Button';
import Features from '../components/Features';

import HomePic from '../components/HomePic';
import Intro from '../components/Intro';

function HomeScreen() {
  return (
    <div>
      <Intro />
      <HomePic />
      <div className="flex gap-5 ml-20">
        <Button
          content="Login as Organiser"
          path="/organizerdefault"
          color="blue"
          organizerlogin={true}
        />
        <Button
          content="Register as Voter"
          path="/voterregistration"
          color="blue"
          forElectionList={true}
          voterlogin={true}
        />
      </div>
      <Features />
    </div>
  );
}

export default HomeScreen;
