import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls eventHandler with correct parameters", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = component.container.querySelector("#title");
  const inputAuthor = component.container.querySelector("#author");
  const inputUrl = component.container.querySelector("#url");
  const form = component.container.querySelector("form");

  // fill title
  fireEvent.change(inputTitle, {
    target: { value: "The Killing Joke" },
  });

  // fill author
  fireEvent.change(inputAuthor, {
    target: { value: "Alan Moore" },
  });

  // fill url
  fireEvent.change(inputUrl, {
    target: { value: "lmgtfy.com" },
  });

  // submit form
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("The Killing Joke");
  expect(createBlog.mock.calls[0][0].author).toBe("Alan Moore");
  expect(createBlog.mock.calls[0][0].url).toBe("lmgtfy.com");
});
