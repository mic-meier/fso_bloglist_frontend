import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const standardView = (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={handleClick}>view</button>
    </div>
  );

  const detailedView = (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={handleClick}>hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  );

  return <div>{showDetails ? detailedView : standardView}</div>;
};

export default Blog;
