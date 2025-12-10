import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 1 1-1.414 1.414l-3.675-3.675ZM4 11a7 7 0 1 1 12.042 4.856 1.029 1.029 0 0 0-.186.186A7 7 0 0 1 4 11Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default SearchIcon;
