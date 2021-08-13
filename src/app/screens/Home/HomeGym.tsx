import {
  BarChart,
  Board,
  CardStatus,
  CardTrainnerStatus,
  Header,
  Row,
} from 'components';
import React from 'react';
import {HomeStyle} from './styles';

const HomeGym = ({navigation}: any) => {
  return (
    <HomeStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <BarChart />
      <Row>
        <CardTrainnerStatus />
        <CardStatus />
      </Row>
      <Board title="Mural de Avisos" />
      <Board title="Mural de Post" />
    </HomeStyle>
  );
};

export default HomeGym;
