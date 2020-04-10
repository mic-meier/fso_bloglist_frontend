import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author, but does not render url and number of likes", () => {
  const blog = {
    title: "Testing Blog",
    author: "Testing Author",
    url: "Testing URL",
    likes: 0,
    user: {
      name: "Bruce Wayne",
      username: "Batman",
      id: 1,
    },
  };

  const user = {
    username: "Batman",
    name: "Bruce Wayne",
    id: 1,
  };

  const component = render(<Blog blog={blog} user={user} />);

  expect(component.container).toHaveTextContent("Testing Blog");
  expect(component.container).toHaveTextContent("Testing Author");
  expect(component.container).not.toHaveTextContent("Testing URL");
  expect(component.container).not.toHaveTextContent("likes");
});
