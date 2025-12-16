import Svg, { Path, type SvgProps } from "react-native-svg";

const StarIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 15 14" fill="none" {...props}>
    <Path
      d="M7.23806 0L9.12584 5.01231L14.4762 5.25881L10.2926 8.60308L11.7115 13.7677L7.23806 10.8223L2.76465 13.7677L4.18357 8.60308L-6.81877e-05 5.25881L5.35028 5.01231L7.23806 0Z"
      fill={props.color || props.fill || "#FFD035"}
    />
  </Svg>
);

export default StarIcon;
