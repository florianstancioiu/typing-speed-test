import PersonalBestSvg from "../../images/icon-personal-best.svg?react";

export type PersonalBestProps = {
  wpm: number;
};

const PersonalBest = ({ wpm }: PersonalBestProps) => {
  return (
    <div>
      <div>
        <PersonalBestSvg />
      </div>
      <span>{wpm} WPM</span>
    </div>
  );
};

export default PersonalBest;
