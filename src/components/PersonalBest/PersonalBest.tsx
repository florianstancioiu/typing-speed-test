import PersonalBestSvg from "../../images/icon-personal-best.svg?react";

const PersonalBest = () => {
  const stats = JSON.parse(localStorage.getItem("personalBest:v1") ?? "{}");
  const wpm = stats.hasOwnProperty("wpm") ? stats.wpm : 0;

  return (
    <div className="flex justify-between items-center gap-x-2.5">
      <PersonalBestSvg />
      <p>
        <span className="hidden md:inline">Personal </span>Best:{" "}
        <span className="text-white">{wpm} WPM</span>
      </p>
    </div>
  );
};

export default PersonalBest;
