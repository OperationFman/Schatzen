import { render, cleanup, screen } from "@testing-library/react";
import { AlertController } from "./AlertController";

describe('Alert Controller', () => {
    it("Renders single error message correctly", () => {
      // @ts-ignore
        render(<AlertController message="Hello There" color="error"/>);
    
        expect(screen.getByText("Hello There")).toBeTruthy();
      });
})