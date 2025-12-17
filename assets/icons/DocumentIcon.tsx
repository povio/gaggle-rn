import Svg, { Path, type SvgProps } from "react-native-svg";

const DocumentIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 18 21"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.75 2.75L6.05 1.125C6.24 0.889 6.527 0.75 6.831 0.75H10.669C10.973 0.75 11.26 0.889 11.45 1.125L12.75 2.75V3.75C12.75 4.303 12.302 4.75 11.75 4.75H5.75C5.198 4.75 4.75 4.303 4.75 3.75V2.75Z"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.75 2.68945H2.75C1.646 2.68945 0.75 3.58545 0.75 4.68945V17.6895C0.75 18.7935 1.646 19.6895 2.75 19.6895H14.75C15.854 19.6895 16.75 18.7935 16.75 17.6895V4.68945C16.75 3.58545 15.854 2.68945 14.75 2.68945H12.75"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.75 10.25H12.75"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.75 15.25H12.75"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default DocumentIcon;
