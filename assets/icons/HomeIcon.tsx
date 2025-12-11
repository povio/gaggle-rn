import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const HomeIcon = (props: SvgProps) => (
  <Svg
    width={23}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.76168 24V17.6471C7.76168 15.6975 9.34083 14.1178 11.2897 14.1178C13.2386 14.1178 14.8177 15.6975 14.8177 17.6471V24H22.5794V11.8788C22.5794 11.1305 22.2817 10.412 21.7525 9.88255L12.2874 0.413994C11.7357 -0.137998 10.8424 -0.137998 10.292 0.413994L0.826971 9.88255C0.297766 10.412 0 11.1305 0 11.8788V24H7.76168Z"
    />
  </Svg>
);

export default HomeIcon;
