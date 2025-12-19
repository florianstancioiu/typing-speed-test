import SmallLogoSvg from "../../../images/logo-small.svg?react";
import PersonalBest from "../../PersonalBest/PersonalBest";

const Header = () => {
  return (
    <header className="p-4 mb-8 flex justify-between items-center">
      <div>
        <SmallLogoSvg></SmallLogoSvg>
      </div>
      <PersonalBest wpm={92} />
    </header>
  );
};

export default Header;
