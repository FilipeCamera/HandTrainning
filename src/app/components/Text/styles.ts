import styled from 'styled-components/native';

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
}
export const TextStyle = styled.TextInput<TextProps>`
  font-size: ${(props: any) => props.size || '14px'};
  font-family: ${(props: any) => family[props.weight || 400]};
  color: ${(props: any) => props.color || '#000'};
`;
