import { Alert } from "react-native";

import { act, fireEvent, render, screen, waitFor } from "@/testing/utils";

import CreateFlowerForm from "../components/CreateFlowerForm";

jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  useRouter: jest.fn().mockReturnValue({ back: jest.fn() }),
}));

describe("<CreateFlowerForm />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render create flower form inputs", () => {
    render(<CreateFlowerForm />);

    expect(screen.queryByLabelText("Name")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("e.g. Bee Orchid...")).toBeOnTheScreen();

    expect(screen.queryByLabelText("Latin name")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("e.g. Ophrys apifera...")).toBeOnTheScreen();

    expect(screen.queryByLabelText("Description")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("Up to 140 characters...")).toBeOnTheScreen();

    expect(screen.queryByRole("button", { name: "Create flower" })).toBeOnTheScreen();
  });

  it("should display errors when form is submitted and fields are invalid", async () => {
    render(<CreateFlowerForm />);

    // Make "name" field valid to verify that the error is not shown there
    act(() => {
      fireEvent.changeText(screen.getByLabelText("Name"), "New flower");
    });
    // Description field takes at most 140 chars - we populate it with 141 to verify that
    // error is displayed
    act(() => {
      fireEvent.changeText(screen.getByLabelText("Description"), "a".repeat(141));
    });

    act(() => {
      // Submit the form
      fireEvent.press(screen.getByRole("button", { name: "Create flower" }));
    });

    // Assert errors are visible
    await waitFor(() => {
      expect(screen.queryByText("Required")).toBeOnTheScreen();
    });
    await waitFor(() => {
      expect(screen.queryByText("String must contain at most 140 character(s)")).toBeOnTheScreen();
    });
  });

  it("should submit form when valid", async () => {
    // Overriding console.log behaviour to not polute console with debug values
    // - not very likely scenario, but doable if needed
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const alertSpy = jest.spyOn(Alert, "alert");

    render(<CreateFlowerForm />);

    act(() => {
      fireEvent.changeText(screen.getByLabelText("Name"), "New flower");
    });
    act(() => {
      fireEvent.changeText(screen.getByLabelText("Latin name"), "Novus flos");
    });
    act(() => {
      fireEvent.changeText(screen.getByLabelText("Description"), "What an awesome flower");
    });

    act(() => {
      fireEvent.press(screen.getByRole("button", { name: "Create flower" }));
    });

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith({
        name: "New flower",
        latinName: "Novus flos",
        description: "What an awesome flower",
      });
    });
    expect(alertSpy).toHaveBeenCalledWith(
      "Submit would succeed!",
      "But we don't have that implemented yet... Confirm to go back to flowers list screen.",
      [{ text: "Back to flowers list", onPress: expect.any(Function) }],
    );

    // Simulate click on Confirm button. As we cannot reach native elements from Jest env,
    // we need to access the args that the mock was called with and manually trigger the
    // callback
    const confirmButtonConfig = alertSpy.mock.calls[0][2]?.[0];
    confirmButtonConfig?.onPress?.();

    // Restore mocks back to original implementation
    alertSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
