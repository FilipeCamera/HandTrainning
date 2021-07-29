import {
  BarChart,
  Board,
  Button,
  CardStatus,
  CardTrainnerStatus,
  Header,
  Row,
} from 'components';
import {Logout} from 'functions';
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
      <Button
        title="Logout"
        size={15}
        weight={500}
        color="#090A0A"
        onPress={() => {
          Logout().then(_ => navigation.navigate('Public'));
        }}
      />
    </HomeStyle>
  );
};

export default HomeGym;
