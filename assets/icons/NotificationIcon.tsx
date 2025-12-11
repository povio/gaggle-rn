import * as React from "react";
import Svg, { Path, type SvgProps } from "react-native-svg";

const NotificationIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M15.7745 20.5588L11.7744 21.6306"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6857 6.95999L16.675 6.91999C15.7499 3.46743 12.2015 1.41982 8.75015 2.3446C5.29884 3.26937 3.24964 6.81686 4.17475 10.2694L4.18547 10.3094L5.01345 13.3995C5.12164 13.8032 4.99203 14.2345 4.67934 14.5126L4.13465 14.9948C3.45514 15.5989 3.17358 16.5331 3.40904 17.4119C3.75202 18.6919 5.06754 19.4515 6.34757 19.1085L19.2128 15.6612C20.4928 15.3183 21.2523 14.0027 20.9093 12.7227C20.6739 11.844 19.9629 11.1757 19.0724 10.9923L18.3596 10.847C17.9498 10.7625 17.6219 10.4538 17.5137 10.05L16.6857 6.95999Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default NotificationIcon;
