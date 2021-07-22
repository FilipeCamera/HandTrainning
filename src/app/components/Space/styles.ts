import styled from 'styled-components/native';

interface SpaceProps {
  marginVertical: number;
  marginHorizontal: number;
}

export const SpaceContainer = styled.View<SpaceProps>`
  ${(props: any) =>
    props.marginVertical ? `margin: ${props.marginVertical}px 0` : ''}
  ${(props: any) =>
    props.marginHorizontal ? `margin: 0 ${props.marginHorizontal}px` : ''}
`;
