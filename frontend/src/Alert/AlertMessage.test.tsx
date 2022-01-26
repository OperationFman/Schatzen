import { render, cleanup, screen } from "@testing-library/react";
import { AlertMessage } from "./AlertMessage"

describe("Alert Message", () => {
    it('displays message with correct message', () => {
        const testMessage = "Test Alert Message"
        const testColor = "error"
        
        render(<AlertMessage visible={true} message={testMessage} color={testColor}  />);

        expect(screen.getByText("Test Alert Message")).toBeTruthy();
    })
})

