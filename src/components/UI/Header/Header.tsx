import SmallLogo from "../../../images/logo-small.svg?react";
import PersonalBest from "../../PersonalBest/PersonalBest";
import { useTypingContext } from "../../../context/TypingContext";
import { useStatsContext } from "../../../context/StatsContext";

const Header = () => {
  const { setStage, setTextThatWasTyped, setIsStarted, setTime } =
    useTypingContext();
  const { setAccuracy, setWpm } = useStatsContext();

  const restartTest = () => {
    setTextThatWasTyped("");
    setIsStarted(false);
    setTime(60);
    setAccuracy(0);
    setWpm(0);
    setStage("not-started");
  };

  return (
    <header className="p-4 mb-8 flex justify-between items-center md:p-8 md:mb-10 md:pb-0 xl:max-w-7xl xl:mx-auto xl:px-0">
      <div
        onClick={restartTest}
        className="md:flex md:gap-x-2.5 md:items-center cursor-pointer"
      >
        <SmallLogo />
        <div className="hidden md:block">
          <h1 className="text-white text-2xl font-bold">Typing Speed Test</h1>
          <p className="text-xs">Type as fast as you can in 60 seconds</p>
        </div>
      </div>
      <PersonalBest />
    </header>
  );
};

export default Header;
