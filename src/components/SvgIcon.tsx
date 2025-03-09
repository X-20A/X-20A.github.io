import { CSSProperties } from 'react';

interface PropsType {
  style?: CSSProperties;
  color?: string;
}

export const Menu = (props: PropsType) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={props.style ? props.style : undefined}
    >
      <g mask='url(#mask0_1235_3833)'>
        <path
          d='M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z'
          fill={props.color ? props.color : '#FFFFFF'}
        />
      </g>
    </svg>
  );
};