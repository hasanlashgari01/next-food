import Score, { IScore } from "./Score";

export interface IScoreCount extends IScore {
  count: number;
}

const ScoreCount: React.FC<IScoreCount> = ({ score, count }) => {
  return (
    <div className="flex items-center gap-2 font-Dana">
      <Score score={score} />
      {typeof count === "number" && count !== 0 ? (
        <span className="text-xs text-slate-400 md:mb-1 md:text-sm">({count} امتیاز)</span>
      ) : null}
    </div>
  );
};

export default ScoreCount;
