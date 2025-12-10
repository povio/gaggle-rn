import { fireEvent, render, screen } from "@/testing/utils";

import Counter from "./Counter";

describe("<Counter />", () => {
  it("should render counter initial state", () => {
    render(<Counter />);

    expect(screen.queryByText("Counter")).toBeOnTheScreen();
    expect(screen.queryByText("Zustand count: 0")).toBeOnTheScreen();

    expect(screen.queryByRole("button", { name: "Increment" })).toBeOnTheScreen();
    expect(screen.queryByRole("button", { name: "Decrement" })).toBeOnTheScreen();
  });

  it("should respond to increment/decrement actions", () => {
    render(<Counter />);

    // By default, count = 0, decrement button should be disabled
    expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
    expect(screen.queryByText("Zustand count: 0"));

    // We increment the current count 3 times
    fireEvent.press(screen.getByRole("button", { name: "Increment" }));
    fireEvent.press(screen.getByRole("button", { name: "Increment" }));
    fireEvent.press(screen.getByRole("button", { name: "Increment" }));

    expect(screen.queryByText("Zustand count: 3")).toBeOnTheScreen();

    // Decrement button should now be enabled
    expect(screen.getByRole("button", { name: "Decrement" })).not.toBeDisabled();

    // We decrement count back to 0
    fireEvent.press(screen.getByRole("button", { name: "Decrement" }));
    fireEvent.press(screen.getByRole("button", { name: "Decrement" }));
    fireEvent.press(screen.getByRole("button", { name: "Decrement" }));

    // Decrement button should again be disabled
    expect(screen.getByRole("button", { name: "Decrement" })).toBeDisabled();
  });
});
