import styled from 'styled-components/native';

import normalize from '@normalize';

const family = {
  300: 'Poppins-Thin',
  400: 'Poppins-Regular',
  500: 'Poppins-Medium',
  600: 'Poppins-SemiBold',
  700: 'Poppins-Bold',
  900: 'Poppins-Black',
};

interface TextProps {
  size: number;
  weight: 300 | 400 | 500 | 600 | 700 | 900;
  color: string;
  center: boolean;
}

export const TextStyle = styled.Text<TextProps>`
  font-size: ${(props: any) =>
    `${normalize(props.size)}px` || `${normalize(14)}px`};
  font-family: ${(props: TextProps) => family[props.weight || 400]};
  color: ${(props: any) => props.color || '#000'};
  ${(props: any) => (props.center ? 'text-align: center' : '')};
`;
