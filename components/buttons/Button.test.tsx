import { fireEvent, render, screen } from "../../testing/utils";
import Text from "../text/Text";
import Button from "./Button";

describe("<Button />", () => {
  it("should render basic button and respond to onPress action", () => {
    const onPress = jest.fn();
    render(
      <Button
        label="Press me"
        onPress={onPress}
      />,
    );

    fireEvent.press(screen.getByRole("button", { name: "Press me" }));

    expect(onPress).toHaveBeenCalled();
  });

  it("should render leftElement if passed", () => {
    render(
      <Button
        label="Button with left element"
        onPress={jest.fn()}
        leftElement={<Text>Lefty</Text>}
      />,
    );

    expect(screen.queryByRole("button", { name: "Button with left element" })).toBeOnTheScreen();
    expect(screen.queryByText("Lefty")).toBeOnTheScreen();
  });

  it("should render left loading indicator without leftElement if leftElement is passed and loading=true", () => {
    render(
      <Button
        label="Button with left element"
        onPress={jest.fn()}
        leftElement={<Text>Lefty</Text>}
        loading
      />,
    );

    expect(screen.queryByText("Lefty")).not.toBeOnTheScreen();
    expect(screen.queryByRole("spinbutton", { name: "Button with left element - loading..." })).toBeOnTheScreen();
  });

  it("should render left loading indicator when loading=true and loaderPosition=left", () => {
    render(
      <Button
        label="Press me"
        onPress={jest.fn()}
        loading
        loaderPosition="left"
      />,
    );

    expect(screen.queryByRole("spinbutton", { name: "Press me - loading..." })).toBeOnTheScreen();
  });

  it("should render rightElement if passed", () => {
    render(
      <Button
        label="Button with right element"
        onPress={jest.fn()}
        rightElement={<Text>Righty</Text>}
      />,
    );

    expect(screen.queryByRole("button", { name: "Button with right element" })).toBeOnTheScreen();
    expect(screen.queryByText("Righty")).toBeOnTheScreen();
  });

  it("should render right loading indicator without rightElement if rightElement is passed and loading=true", () => {
    render(
      <Button
        label="Button with right element"
        onPress={jest.fn()}
        rightElement={<Text>Righty</Text>}
        loading
      />,
    );

    expect(screen.queryByText("Righty")).not.toBeOnTheScreen();
    expect(screen.queryByRole("spinbutton", { name: "Button with right element - loading..." })).toBeOnTheScreen();
  });

  it("should render right loading indicator when loading=true and loaderPosition=right", () => {
    render(
      <Button
        label="Press me"
        onPress={jest.fn()}
        loading
        loaderPosition="right"
      />,
    );

    expect(screen.queryByRole("spinbutton", { name: "Press me - loading..." })).toBeOnTheScreen();
  });
});
