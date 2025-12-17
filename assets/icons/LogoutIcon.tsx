import Svg, { Path, type SvgProps } from "react-native-svg";

const LogoutIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 21 23"
    fill="none"
    {...props}
  >
    <Path
      d="M15.4674 17.5297C17.6979 15.9095 19.1861 13.3156 19.2898 10.3469C19.4685 5.22883 15.4644 0.934955 10.3464 0.756229C5.22834 0.577503 0.93446 4.58161 0.755734 9.69965C0.64331 12.919 2.18592 15.8123 4.61976 17.5604"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.0497 21.4291V13.2041"
      stroke={props.color || props.fill || "#B1B1B1"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default LogoutIcon;
