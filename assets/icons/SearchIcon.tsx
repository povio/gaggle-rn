import * as React from "react";
import Svg, { Circle, Path, type SvgProps } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Circle
      cx={9.25}
      cy={9.25}
      r={8.5}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.0796 17.4515L16.4321 14.3945"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SearchIcon;
