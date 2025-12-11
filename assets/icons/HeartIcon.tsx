import Svg, { Path, SvgProps } from "react-native-svg";

const HeartIcon = (props: SvgProps) => (
  <Svg width={25} height={22} viewBox="0 0 25 22" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.0723 1.94496C21.8386 0.699654 20.165 0 18.4199 0C16.6747 0 15.0011 0.699654 13.7674 1.94496L12.4997 3.22404L11.2319 1.94496C8.66247 -0.647459 4.49655 -0.647459 1.92709 1.94496C-0.642365 4.53738 -0.642365 8.74052 1.92709 11.3329L3.19485 12.612L12.4997 22L21.8045 12.612L23.0723 11.3329C24.3065 10.0882 25 8.39966 25 6.63895C25 4.87823 24.3065 3.18968 23.0723 1.94496Z"
      fill={props.fill || "#E5E3EC"}
    />
  </Svg>
);

export default HeartIcon;
