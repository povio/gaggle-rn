import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const InfoIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-9 7a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z"
      clipRule="evenodd"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 7.8a1 1 0 0 1 1 1V12a1 1 0 1 1-2 0V8.8a1 1 0 0 1 1-1ZM11 15.2a1 1 0 0 1 1-1h.008a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default InfoIcon;
