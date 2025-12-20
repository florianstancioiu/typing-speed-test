import PersonalBestSvg from "../../images/icon-personal-best.svg?react";

export type PersonalBestProps = {
  wpm: number;
};

const PersonalBest = ({ wpm }: PersonalBestProps) => {
  return (
    <div className="flex justify-between items-center gap-x-2.5">
      <PersonalBestSvg />
      <p>
        <span className="hidden">Personal </span>Best:{" "}
        <span className="text-white">{wpm} WPM</span>
      </p>
    </div>
  );
};

export default PersonalBest;
