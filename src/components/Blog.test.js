import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;

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

    const user = {
      username: "Batman",
      name: "Bruce Wayne",
      id: 1,
    };

    component = render(<Blog blog={blog} user={user} />);
  });

  test("renders blog title and author, but does not render url and number of likes", () => {
    expect(component.container).toHaveTextContent("Testing Blog");
    expect(component.container).toHaveTextContent("Testing Author");
    expect(component.container).not.toHaveTextContent("Testing URL");
    expect(component.container).not.toHaveTextContent("likes");
  });

  test("renders blog's url and number of likes when the button controlling the detailedView is clicked", () => {
    const button = component.container.querySelector(".detailsButton");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("Testing Blog");
    expect(component.container).toHaveTextContent("Testing Author");
    expect(component.container).toHaveTextContent("Testing URL");
    expect(component.container).toHaveTextContent("likes");
  });
});
