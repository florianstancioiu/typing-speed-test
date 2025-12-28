import SmallLogo from "../../../images/logo-small.svg?react";
import PersonalBest from "../../PersonalBest/PersonalBest";

const Header = () => {
  return (
    <header className="p-4 mb-8 flex justify-between items-center md:p-8 md:mb-10 md:pb-0 xl:max-w-7xl xl:mx-auto xl:px-0">
      <div className="md:flex md:gap-x-2.5 md:items-center">
        <SmallLogo />
        <div className="hidden md:block">
          <h1 className="text-white text-2xl font-bold">Typing Speed Test</h1>
          <p className="text-xs">Type as fast as you can in 60 seconds</p>
        </div>
      </div>
      <PersonalBest wpm={92} />
    </header>
  );
};

export default Header;
