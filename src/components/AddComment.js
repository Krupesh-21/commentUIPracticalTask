import React, { useContext } from "react";
import { CommentContext } from "../commentContext";

const AddComment = () => {
  const { setIsOpen, setUserComment } = useContext(CommentContext);
  return (
    <div className="add-comment-container">
      <button
        onClick={() => {
          setIsOpen(v=> !v);
          setUserComment(true);
        }}
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
