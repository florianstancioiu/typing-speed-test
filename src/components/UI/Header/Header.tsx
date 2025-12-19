import SmallLogo from "../../../images/logo-small.svg?react";
import PersonalBest from "../../PersonalBest/PersonalBest";

const Header = () => {
  return (
    <header className="p-4 mb-8 flex justify-between items-center">
      <div>
        <SmallLogo />
      </div>
      <PersonalBest wpm={92} />
    </header>
  );
};

export default Header;
