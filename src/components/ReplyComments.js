import React, { useContext } from "react";
import { CommentContext } from "../commentContext";

const ReplyComments = ({ repliesLikes = [], commentId }) => {
  const { dispatch } = useContext(CommentContext);
  const handleLikes = (commentId, replyId) => {
    dispatch({ type: "ADD_LIKE", payload: { commentId, replyId } });
  };

  const handleDelete = (commentId, replyId) => {
    console.log("commentId,replyId", commentId, replyId);
    dispatch({ type: "DELETE_REPLY", payload: { commentId, replyId } });
  };
  return (
    <div className="reply-container">
      {repliesLikes.length !== 0 &&
        repliesLikes.map(({ reply, likes, replyId }) => {
          console.log(likes);
          return (
            <div className="reply-comment">
              <p>{reply}</p>
              <div className="r-btns">
                <button
                  className="r-like"
                  onClick={() => handleLikes(commentId, replyId)}
                >
                  <span>{likes}</span>
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <button
                  className="r-delete"
                  onClick={() => handleDelete(commentId, replyId)}
                >
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ReplyComments;
