const CommentRate = ({ rate = 0 }: { rate: number }) => {
  return <span className="w-96">{rate}</span>;
};

export default CommentRate;
