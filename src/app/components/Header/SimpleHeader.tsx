import {Text} from 'components';
import React from 'react';
import {Container, IconLeft, IconRight} from './styles';

import ArrowBack from 'assets/svg/arrowBack.svg';
import Add from 'assets/svg/add_icon_black.svg';

interface SimpleHeaderProps {
  title: string;
  back: boolean;
  add: boolean;
  marginBottom: number;
  onBack: () => any;
  onAdd: () => any;
  color: string;
  size: number;
  weight: number;
}

const SimpleHeader = ({
  title,
  back,
  add,
  onBack,
  onAdd,
  color,
  size,
  weight,
  marginBottom,
}: SimpleHeaderProps) => {
  return (
    <Container marginBottom={marginBottom}>
      {!!back && (
        <IconLeft onPress={onBack}>
          <ArrowBack />
        </IconLeft>
      )}
      <Text title={title} weight={weight} size={size} color={color} />
      {!!add && (
        <IconRight onPress={onAdd}>
          <Add />
        </IconRight>
      )}
    </Container>
  );
};

export default SimpleHeader;
