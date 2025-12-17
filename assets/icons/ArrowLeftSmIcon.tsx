import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

const ArrowLeftSmIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0_728_6432)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.146447 7.35354C-0.0488156 7.15828 -0.0488156 6.8417 0.146447 6.64644L3.64645 3.14639C3.78945 3.00339 4.0045 2.96069 4.19134 3.03809C4.37818 3.11549 4.5 3.29779 4.5 3.49999L4.5 5.99999L13 5.99999C13.5523 5.99999 14 6.44771 14 6.99999C14 7.55228 13.5523 7.99999 13 7.99999L4.5 7.99999V10.5C4.5 10.7022 4.37818 10.8845 4.19134 10.9619C4.0045 11.0393 3.78945 10.9965 3.64645 10.8535L0.146447 7.35354Z"
        fill={props.color || props.fill || "#B2B2B2"}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_728_6432">
        <Rect
          width="14"
          height="14"
          fill="white"
          transform="matrix(0 -1 1 0 0 14)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ArrowLeftSmIcon;
