import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const ArrowDownIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m12 15-5-5h10l-5 5Z"
    />
  </Svg>
);

export default ArrowDownIcon;
