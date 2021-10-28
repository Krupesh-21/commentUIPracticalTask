import React, { useState, useReducer } from "react";
import AddComment from "./components/AddComment";
import Comments from "./components/Comments";
import Modal from "./components/reusable/Modal";
import { CommentContext } from "./commentContext";
import "./styles.css";
import Header from "./components/Header";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.payload];
    case "ADD_REPLY":
      console.log(action.payload);
      const found = state.find(
        (comment) => action.payload.commentId === comment.commentId
      );
      const index = state.findIndex(
        (comment) => action.payload.commentId === comment.commentId
      );
      const sCopy = [...state];
      if (found) {
        sCopy[index] = {
          ...found,
          repliesLikes: [
            ...found.repliesLikes,
            {
              reply: action.payload.reply,
              replyId: action.payload.replyId,
              likes: 0,
            },
          ],
        };
        return sCopy;
      }
      return sCopy;
    case "ADD_LIKE":
      const foundCom = state.find(
        (comment) => action.payload.commentId === comment.commentId
      );
      const indexCom = state.findIndex(
        (comment) => action.payload.commentId === comment.commentId
      );
      const upRepLikes = foundCom.repliesLikes.map((item) => {
        if (item.replyId === action.payload.replyId) {
          return { ...item, likes: item.likes + 1 };
        } else {
          return item;
        }
      });
      const copy = [...state];
      copy[indexCom] = { ...foundCom, repliesLikes: upRepLikes };
      return copy;

    case "DELETE_REPLY":
      console.log("delete", action.payload);
      const foundComment = state.find(
        (comment) => action.payload.commentId === comment.commentId
      );
      const indexComment = state.findIndex(
        (comment) => action.payload.commentId === comment.commentId
      );

      const updatedRepliesLikes = foundComment.repliesLikes.filter(
        (item) => item.replyId !== action.payload.replyId
      );

      const shCopy = [...state];
      shCopy[indexComment] = {
        ...foundComment,
        repliesLikes: updatedRepliesLikes,
      };
      return shCopy;

    case "DELETE_COMMENT":
      const updatedCommentData = state.filter(
        (comment) => comment.commentId !== action.payload
      );

      return updatedCommentData;
    default:
      return state;
  }
};

const initialState = [];

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userComment, setUserComment] = useState(false);
  const [commentsData, dispatch] = useReducer(reducer, initialState);
  const [cId, setCId] = useState(null);
  return (
    <CommentContext.Provider
      value={{
        isOpen,
        setIsOpen,
        setUserComment,
        commentsData,
        dispatch,
        cId,
        setCId,
      }}
    >
      <div className="container">
        <Header />
        <AddComment />
        <Comments />
        {isOpen ? (
          userComment ? (
            <Modal type="userComment" />
          ) : (
            <Modal type="reply" />
          )
        ) : null}
      </div>
    </CommentContext.Provider>
  );
};

export default App;
