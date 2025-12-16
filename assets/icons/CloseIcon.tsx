import Svg, { Path, type SvgProps } from "react-native-svg";

const CloseIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M0.75 0.75L12.75 12.75"
      stroke={props.color || props.stroke || "#1C1C1C"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.75 0.75L0.75 12.75"
      stroke={props.color || props.stroke || "#1C1C1C"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CloseIcon;
