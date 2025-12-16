import Svg, { Path, type SvgProps } from "react-native-svg";

const CopyIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <Path
      d="M14.6668 11.8252V15.6752C14.6668 18.8835 13.3835 20.1668 10.1752 20.1668H6.32516C3.11683 20.1668 1.8335 18.8835 1.8335 15.6752V11.8252C1.8335 8.61683 3.11683 7.3335 6.32516 7.3335H10.1752C13.3835 7.3335 14.6668 8.61683 14.6668 11.8252Z"
      stroke={props.color || props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.1668 6.32516V10.1752C20.1668 13.3835 18.8835 14.6668 15.6752 14.6668H14.6668V11.8252C14.6668 8.61683 13.3835 7.3335 10.1752 7.3335H7.3335V6.32516C7.3335 3.11683 8.61683 1.8335 11.8252 1.8335H15.6752C18.8835 1.8335 20.1668 3.11683 20.1668 6.32516Z"
      stroke={props.color || props.stroke || "white"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CopyIcon;
