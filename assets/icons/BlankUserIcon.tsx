import Svg, { ClipPath, Defs, G, Path, Rect, type SvgProps } from "react-native-svg";

const BlankUserIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_1987_10037)">
      <Path
        d="M8.09608 0C5.74192 0 3.82666 1.89253 3.82666 4.21875C3.82666 6.54497 5.74192 8.4375 8.09608 8.4375C10.4502 8.4375 12.3655 6.54497 12.3655 4.21875C12.3655 1.89253 10.4502 0 8.09608 0Z"
        fill={props.color || props.fill || "#B1B1B1"}
      />
      <Path
        d="M13.4081 11.1936C12.2393 10.0208 10.6897 9.375 9.04492 9.375H7.1474C5.50263 9.375 3.95306 10.0208 2.78419 11.1936C1.62104 12.3606 0.980469 13.901 0.980469 15.5312C0.980469 15.7901 1.19286 16 1.45485 16H14.7375C14.9995 16 15.2119 15.7901 15.2119 15.5312C15.2119 13.901 14.5713 12.3606 13.4081 11.1936Z"
        fill={props.color || props.fill || "#B1B1B1"}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1987_10037">
        <Rect
          width="16.1922"
          height="16"
          fill="white"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default BlankUserIcon;
