import Svg, { Path, type SvgProps } from "react-native-svg";

const EditIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 19 19"
    fill="none"
    {...props}
  >
    <Path
      d="M15.0202 6.92814L11.75 3.75"
      stroke={props.color || props.fill || "#323232"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.89276 17.75H0.75V14.6074C0.75 14.3502 0.851504 14.1047 1.03324 13.9239L13.9233 1.03347C14.3013 0.655509 14.9122 0.655509 15.2902 1.03347L17.4672 3.20944C17.8443 3.5874 17.8443 4.1993 17.4672 4.57727L4.57622 17.4668C4.39545 17.6485 4.14894 17.75 3.89276 17.75Z"
      stroke={props.color || props.fill || "#323232"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default EditIcon;
