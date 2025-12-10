import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const CloseIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M17.749 7.463a.857.857 0 1 0-1.212-1.212L12 10.788 7.463 6.25a.857.857 0 0 0-1.212 1.212L10.788 12 6.25 16.537a.857.857 0 1 0 1.212 1.212L12 13.212l4.537 4.537a.857.857 0 1 0 1.212-1.212L13.212 12l4.537-4.537Z"
    />
  </Svg>
);

export default CloseIcon;
