import React, { useCallback, useContext, useState } from "react";
import { CommentContext } from "../../commentContext";
import { nanoid } from "nanoid";

const Modal = ({ type }) => {
  const [comment, setComment] = useState("");
  const comContext = useContext(CommentContext);
  const handleChange = useCallback(
    ({ target: { value } }) => setComment(value),
    []
  );
  console.log(comContext);

  const handleClick = (commentId) => {
    if (type === "userComment") {
      comContext.dispatch({
        type: "ADD_COMMENT",
        payload: {
          comment,
          commentId: nanoid(),
          repliesLikes: [],
        },
      });
    } else {
      comContext.dispatch({
        type: "ADD_REPLY",
        payload: {
          reply: comment,
          replyId: nanoid(),
          commentId: comContext.cId,
        },
      });
    }
    setComment("");
    comContext.setIsOpen(false);
  };
  return (
    <div className="modal-container">
      <input
        type="text"
        placeholder="Type your comment here..."
        value={comment}
        onChange={handleChange}
      />
      <div className="modal-footer">
        <button className="comment-btn" onClick={handleClick}>
          Comment
        </button>
        <button
          className="cancel-btn"
          onClick={() => {
            comContext.setIsOpen(false);
            setComment("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
