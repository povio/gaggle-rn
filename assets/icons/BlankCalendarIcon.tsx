import Svg, { Path, type SvgProps } from "react-native-svg";

const BlankCalendarIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={14}
    viewBox="0 0 15 14"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.59214 1C4.59214 0.447715 4.13525 0 3.57166 0C3.00807 0 2.55119 0.447715 2.55119 1V2H1.53071C0.685323 2 0 2.67157 0 3.5V5H14.2867V3.5C14.2867 2.67157 13.6013 2 12.7559 2H11.7356V1C11.7356 0.447715 11.2787 0 10.7151 0C10.1515 0 9.6946 0.447715 9.6946 1V2H4.59214V1ZM14.2867 6.25H0V12.5C0 13.3284 0.685323 14 1.53071 14H12.7559C13.6013 14 14.2867 13.3284 14.2867 12.5V6.25Z"
      fill={props.color || props.fill || "#B1B1B1"}
    />
  </Svg>
);

export default BlankCalendarIcon;
