import {Text} from 'components';
import React from 'react';
import {Container, IconLeft, IconRight} from './styles';

import ArrowBack from '../../../assets/svg/arrowBack.svg';

interface SimpleHeaderProps {
  title: string;
  back: boolean;
  add: boolean;
  marginBottom: number;
  onBack: () => any;
  onAdd: () => any;
}

const SimpleHeader = ({
  title,
  back,
  add,
  onBack,
  onAdd,
  marginBottom,
}: SimpleHeaderProps) => {
  return (
    <Container marginBottom={marginBottom}>
      {!!back && (
        <IconLeft onPress={onBack}>
          <ArrowBack />
        </IconLeft>
      )}
      <Text title={title} weight={500} size={18} />
      {!!add && <IconRight onPress={onAdd} />}
    </Container>
  );
};

export default SimpleHeader;
