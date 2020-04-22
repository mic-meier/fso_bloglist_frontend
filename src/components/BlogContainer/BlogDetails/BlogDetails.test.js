import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogDetails from "./BlogDetails";

describe("<BlogDetails />", () => {
  let component;
  let mockLikeHandler;

  beforeEach(() => {
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

    mockLikeHandler = jest.fn();

    component = render(
      <BlogDetails
        blog={blog}
        likeBlog={mockLikeHandler}
        deleteBlog={mockLikeHandler}
      />
    );
  });

  test("renders blog title", () => {
    expect(component.container).toHaveTextContent("Testing Blog");
  });
  test("renders blog author", () => {
    expect(component.container).toHaveTextContent("Testing Author");
  });
  test("renders blog url", () => {
    expect(component.container).toHaveTextContent("likes");
  });
  test("renders blog likes", () => {
    expect(component.container).toHaveTextContent("likes");
  });

  test("fires event handler for handling likes twice if button is clicked twice", () => {
    const likeButton = component.container.querySelector(".likeButton");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });
});
