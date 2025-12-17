import Svg, { Path, type SvgProps } from "react-native-svg";

const InfoCircleIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 16V11"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.9946 8H12.0036"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default InfoCircleIcon;
