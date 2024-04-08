const CommentBody = ({ body }: { body: string }) => {
  return <div className="line-clamp-1 min-w-32 max-w-20">{body}</div>;
};
export default CommentBody;
