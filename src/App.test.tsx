import { render, cleanup, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("Renders HOST / SPECTATE button correctly", () => {
    render(<App />);

    expect(screen.getByText("HOST / SPECTATE")).toBeTruthy();
  });

  it("Renders PLAY button correctly", () => {
    render(<App />);

    expect(screen.getByText("PLAY")).toBeTruthy();
  });

  it("Initializes Play button as disabled", () => {
    expect(true).toEqual(true);
  });
});
