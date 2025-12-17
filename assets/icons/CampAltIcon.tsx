import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

const CampAltIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 18 17"
    fill="none"
    {...props}
  >
    <Path
      d="M16.2954 15.6301L9.27856 4.02578L11.3469 0.605155L10.3796 0L8.61194 2.92332L6.84428 0L5.87694 0.605116L7.94532 4.02578L0.928462 15.6301H0V16.7852H17.2239V15.6301H16.2954ZM10.8134 15.6301L8.61728 10.9808L6.41205 15.6301H5.15119L8.61943 8.31792L12.0733 15.6301H10.8134Z"
      fill={props.color || props.fill || "#B1B1B1"}
    />
  </Svg>
);

export default CampAltIcon;
