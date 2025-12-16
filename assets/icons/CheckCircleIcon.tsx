import Svg, { Circle, Path, type SvgProps } from "react-native-svg";

const CheckCircleIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={21}
    viewBox="0 0 21 21"
    fill="none"
    {...props}
  >
    <Circle
      cx="10.25"
      cy="10.25"
      r="9.5"
      stroke={props.color || props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.7915 6.29142L9.68742 13.6323L6.2915 10.1762"
      stroke={props.color || props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckCircleIcon;
