import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const CheckIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={13}
    viewBox="0 0 12 9"
    fill="none"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 1 4.125 8 1 4.818"
    />
  </Svg>
);

export default CheckIcon;
