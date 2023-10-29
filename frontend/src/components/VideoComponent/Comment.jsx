import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePostComment } from 'apiList/post';
import Swal from 'sweetalert2';

const alter_img_url = process.env.REACT_APP_ALTER_IMG_URL

const useInputText = (initialValue, validator) => {
  const [text, setText] = useState(initialValue);

  const handleSetText = (event) => {
    if (event.target) {
      const {
        target: { value },
      } = event;
      let willUpdate = true;

      if (typeof validator === 'function') {
        willUpdate = validator(value);
      }

      if (willUpdate) {
        setText(value);
      }
    }
  };

  return [text, handleSetText, setText];
};

const Comment = ({ comment, deleteComment, changeShow }) => {
  let maxLength = 100; // 100자 제한

  const navigate = useNavigate();
  const [content, setContent, resetContent] = useInputText(comment.content, (value) => {return value.length <= maxLength});
  const [updateMode, setUpdateMode] = useState(false);

  const moveToMyPage = (event) => {
      event.preventDefault();
      changeShow();
      window.location.assign("/mypage/"+comment.email)
  }

  const changeUpdateMode = () => {
    // 댓글 수정 상태 textarea 활성/비활성화
    if (updateMode) {
      // 댓글 수정 비활성화 하려고 누른 상태 == 댓글 수정 후 클릭한 상태
      if (content.trim() === '') {
        resetContent(comment.content);
        Swal.fire({
          icon: "info",
          text: "댓글 작성 후 수정해주세요",
          backdrop: false
        })
      } else {
        updatePostComment(
          comment.id,
          { content: content },
          (response) => {},
          (error) => {
          },
        );
      }
    }
    setUpdateMode((updateMode) => {
      return !updateMode;
    });
  };

  const handleChange = (event) => {
    // 댓글 수정 감지
    setContent(event);
  };

  return (
    <div className="bg-white shadow-sm p-3 mb-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="rounded-full w-12 h-12 hover:cursor-pointer object-cover"
            src={comment.profileImg ? "https://storage.googleapis.com/reon-bucket/"+comment.profileImg : alter_img_url}
            alt="User Avatar"
            onClick={moveToMyPage}
          />
          <div className="ml-4">
            <span
              className="text-sm font-semibold mb-1 hover:cursor-pointer"
              onClick={moveToMyPage}
            >
              {comment.nickName}
            </span>

            <textarea
              cols="30"
              rows="2"
              className={
                updateMode
                  ? 'ring-1 ring-green hover:ring-0 focus:ring-green text-sm rounded resize-none w-full bg-white'
                  : 'text-sm rounded resize-none w-full bg-white'
              }
              disabled={!updateMode}
              value={content}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {comment.isMyComment ? (
          <div className="flex flex-col space-y-1">
            <button
              className="w-8 h-8 flex justify-center items-center bg-blue-500 text-info rounded hover:bg-[#c3c5c5] focus:outline-none"
              onClick={changeUpdateMode}
            >
              <span>{updateMode ? '완료' : '수정'}</span>
            </button>

            <button
              className="w-8 h-8 flex justify-center items-center bg-red-500 text-danger rounded hover:bg-[#c3c5c5] focus:outline-none"
              onClick={() => {
                deleteComment(comment.id);
              }}
            >
              <span>삭제</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
