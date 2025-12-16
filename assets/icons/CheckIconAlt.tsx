import Svg, { Circle, Path, type SvgProps } from "react-native-svg";

const CheckIconAlt = (props: SvgProps) => (
  <Svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    {...props}
  >
    <Circle
      cx="26.4658"
      cy="26.4658"
      r="26.4658"
      fill="#04954F"
    />
    <Path
      d="M41.9043 15.4388L24.8991 35.8896L15.4385 26.2613"
      stroke="white"
      strokeWidth={3.30823}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckIconAlt;
