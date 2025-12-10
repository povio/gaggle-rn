import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const IndeterminateIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={2}
    viewBox="0 0 10 2"
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 1H1"
    />
  </Svg>
);

export default IndeterminateIcon;
