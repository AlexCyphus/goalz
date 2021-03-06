import React from "react"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Statistics from "./Statistics";

// mock html canvas
import 'jest-canvas-mock';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
    act(() => {
      render(<Statistics/>, container);
    })
    expect(container.textContent).toContain("Habits");
    expect(container.textContent).toContain("Completed Tickets");
    expect(container.textContent).toContain("x");
  });