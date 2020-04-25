import React, { useState } from "react";

const BlogCommentForm = ({ handleCommenting, blog }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommenting(comment, blog.id);
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={comment}
          type="text"
          name="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogCommentForm;
