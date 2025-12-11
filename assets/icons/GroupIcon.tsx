import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const GroupIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 13.6855H16C16.552 13.6855 17 14.1235 17 14.6631V18.5731C17 19.1127 16.552 19.5506 16 19.5506H14C13.448 19.5506 13 19.1127 13 18.5731V14.6631C13 14.1235 13.448 13.6855 14 13.6855Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 16.6177H17"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 16.6177H3"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 9.77519H8C7.448 9.77519 7 9.33726 7 8.79768V4.88766C7 4.34808 7.448 3.91016 8 3.91016H10C10.552 3.91016 11 4.34808 11 4.88766V8.79768C11 9.33726 10.552 9.77519 10 9.77519Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 6.84227H7"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11 6.84227H21"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default GroupIcon;
