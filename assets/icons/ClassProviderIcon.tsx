import Svg, { Path, type SvgProps } from "react-native-svg";

const ClassProviderIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={17}
    viewBox="0 0 14 17"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9295 15.75H1.70421C0.762635 15.75 0 15.0042 0 14.0833V2.41667C0 1.49583 0.762635 0.75 1.70421 0.75H11.9295C12.8711 0.75 13.6337 1.49583 13.6337 2.41667V14.0833C13.6337 15.0042 12.8711 15.75 11.9295 15.75Z"
      fill={props.color || props.fill || "#B1B1B1"}
    />
    <Path
      d="M10.2249 0.75V15.75"
      stroke={props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.81663 0.75V5.75L5.11241 4.91667L3.4082 5.75V0.75"
      stroke={props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ClassProviderIcon;
