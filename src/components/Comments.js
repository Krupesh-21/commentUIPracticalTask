import React, { useContext } from "react";
import { CommentContext } from "../commentContext";
import ReplyComments from "./ReplyComments";

const Comments = () => {
  const { setIsOpen, setUserComment, commentsData, setCId, dispatch } =
    useContext(CommentContext);

  const handleReply = (commentId) => {
    setIsOpen(true);
    setUserComment(false);
    setCId(commentId);
  };

  const handleDelete = (commentId) => {
    dispatch({ type: "DELETE_COMMENT", payload: commentId });
  };

  return (
    <div>
      {commentsData &&
        commentsData.map(({ comment, commentId, repliesLikes }) => (
          <div className="comment-container">
            <div className="comment">
              <p>{comment}</p>
              <div className="cbtns">
              <button className="c-reply" onClick={() => handleReply(commentId)}>Reply</button>
              <button className="c-delete" onClick={() => handleDelete(commentId)}>Delete</button>
              </div>
            </div>
            <ReplyComments repliesLikes={repliesLikes} commentId={commentId} />
          </div>
        ))}
    </div>
  );
};

export default Comments;
