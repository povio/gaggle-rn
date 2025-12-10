import { fireEvent, render, screen } from "../../testing/utils";
import Text from "../text/Text";
import Input from "./Input";

describe("<Input />", () => {
  const onChangeTextMock = jest.fn();

  const commonProps = {
    label: "Input label",
    placeholder: "Input placeholder",
    onChangeText: onChangeTextMock,
  } as const;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render basic input and respond to onChangeText event", () => {
    render(
      <Input
        label="Simple input"
        placeholder="Enter text here..."
        onChangeText={onChangeTextMock}
      />,
    );

    expect(screen.queryByLabelText("Simple input")).toBeOnTheScreen();
    expect(screen.queryByPlaceholderText("Enter text here...")).toBeOnTheScreen();

    fireEvent.changeText(screen.queryByPlaceholderText("Enter text here..."), "Some text");

    expect(onChangeTextMock).toHaveBeenCalledWith("Some text");
  });

  it("should render * when input is required", () => {
    const { rerender } = render(
      <Input
        {...commonProps}
        required
      />,
    );

    expect(screen.queryByText("*")).toBeOnTheScreen();

    rerender(
      <Input
        {...commonProps}
        required={false}
      />,
    );

    expect(screen.queryByText("*")).not.toBeOnTheScreen();
  });

  it("should render helper text when passed", () => {
    render(
      <Input
        {...commonProps}
        helperText="Help me!"
      />,
    );

    expect(screen.queryByText("Help me!")).toBeOnTheScreen();
  });

  it("should render tooltip icon and present tooltip on icon press when tooltipText is passed", () => {
    render(
      <Input
        {...commonProps}
        tooltipText="Now you have all the info!"
      />,
    );

    expect(screen.queryByLabelText("tooltip")).toBeOnTheScreen();
    expect(screen.queryByText("Now you have all the info!")).not.toBeOnTheScreen();

    fireEvent.press(screen.queryByLabelText("tooltip"), {
      nativeEvent: { pageX: 0, pageY: 0, locationX: 0, locationY: 0 },
    });

    expect(screen.queryByText("Now you have all the info!")).toBeOnTheScreen();
  });

  it("should render leftElement if passed and type is not textarea", () => {
    render(
      <Input
        {...commonProps}
        leftElement={<Text>Lefty</Text>}
        type="input"
      />,
    );

    expect(screen.queryByText("Lefty")).toBeOnTheScreen();
  });

  it("should not render leftElement when passed if type is textarea", () => {
    render(
      <Input
        {...commonProps}
        leftElement={<Text>Lefty</Text>}
        type="textArea"
      />,
    );

    expect(screen.queryByText("Lefty")).not.toBeOnTheScreen();
  });

  it("should render rightElement if passed, type is not textarea, and loading=false", () => {
    render(
      <Input
        {...commonProps}
        rightElement={<Text>Righty</Text>}
        type="input"
        loading={false}
      />,
    );

    expect(screen.queryByText("Righty")).toBeOnTheScreen();
  });

  it.each([
    { loading: false, type: "textArea" },
    { loading: true, type: "input" },
    { loading: true, type: "textArea" },
  ] as const)("should not render rightElement when passed if type=$type and loading=$loading", ({ type, loading }) => {
    render(
      <Input
        {...commonProps}
        rightElement={<Text>Righty</Text>}
        type={type}
        loading={loading}
      />,
    );

    expect(screen.queryByText("Righty")).not.toBeOnTheScreen();
  });

  it("should render loading indicator when loading=true", () => {
    render(
      <Input
        {...commonProps}
        loading
      />,
    );

    expect(screen.queryByRole("spinbutton", { name: "Input label - loading..." })).toBeOnTheScreen();
  });

  it("should render error message when passed", () => {
    const { rerender } = render(
      <Input
        {...commonProps}
        error="You messed something up!"
      />,
    );

    expect(screen.queryByText("You messed something up!")).toBeOnTheScreen();

    rerender(<Input {...commonProps} />);

    expect(screen.queryByText("You messed something up!")).not.toBeOnTheScreen();
  });

  it("should render limit countdown if limit is passed", () => {
    const { rerender } = render(
      <Input
        {...commonProps}
        limit={20}
        value="Four"
      />,
    );

    expect(screen.queryByText("4/20")).toBeOnTheScreen();

    rerender(
      <Input
        {...commonProps}
        limit={20}
        value=""
      />,
    );

    expect(screen.queryByText("0/20")).toBeOnTheScreen();

    rerender(
      <Input
        {...commonProps}
        limit={20}
        value={undefined}
      />,
    );

    expect(screen.queryByText("0/20")).toBeOnTheScreen();
  });
});
