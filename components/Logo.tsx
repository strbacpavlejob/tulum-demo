import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  Filter,
  FeDropShadow,
  G,
} from 'react-native-svg';
const Logo = (props: SvgProps) => (
  <Svg width={180} height={180} viewBox="0 0 744 622" {...props}>
    <Path
      fill="#F3E7FB"
      stroke="#7C41AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M36.95 341.045c64.899 146 261.499 240.9 325.699 268.7 2.8 1 5.7 1.4 8.5 1.4 2.9-.1 5.6-.7 8.1-1.8s4.8-2.7 6.7-4.8c1.9-2 3.5-4.5 4.7-7.3 22.5-66.2 84.1-275.6 19.3-421.7-27.6-62.1-73.6-112.9-128.1-141.3-54.4-28.4-112.8-32-162.2-10-49.5 21.9-86 67.6-101.5 127-15.5 59.4-8.7 127.7 18.8 189.8Z"
    />
    <Path
      fill="#7C41AC"
      stroke="#7C41AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M706.349 341.045c-64.8 146-261.4 240.9-325.6 268.7-2.9 1-5.8 1.4-8.6 1.4-2.8-.1-5.5-.7-8-1.8-2.6-1.1-4.8-2.7-6.8-4.8-1.9-2-3.5-4.5-4.6-7.3-22.6-66.2-84.1-275.6-19.3-421.7 27.5-62.1 73.6-112.9 128-141.3 54.5-28.4 112.8-32 162.3-10 49.4 21.9 85.9 67.6 101.4 127 15.5 59.4 8.7 127.7-18.8 189.8Z"
    />
    <Path
      fill="#7C41AC"
      stroke="#F3E7FB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M200.349 294.845c-41 0-74.1-33.1-74.1-74.1 0-41 33.1-74.1 74.1-74.1 41 0 74.1 33.1 74.1 74.1 0 41-33.1 74.1-74.1 74.1Z"
    />
    <Path
      fill="#F3E7FB"
      stroke="#7C41AC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={20}
      d="M532.349 307.845c-41 0-74.1-33.1-74.1-74.1 0-41 33.1-74.1 74.1-74.1 41 0 74.1 33.1 74.1 74.1 0 41-33.1 74.1-74.1 74.1Z"
    />
  </Svg>
);
export default Logo;
