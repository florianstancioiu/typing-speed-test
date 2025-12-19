import LogoLargeSvg from "../../images/logo-large.svg?react";
import LogoSmallSvg from "../../images/logo-small.svg?react";

const Logo = () => {
  return (
    <div>
      <LogoLargeSvg className="hidden" />
      <LogoSmallSvg className="w-8 h-8" />
      <div>
        <h1>Typing Speed Test</h1>
        <p>Type as fast as you can in 60 seconds</p>
      </div>
    </div>
  );
};

export default Logo;
