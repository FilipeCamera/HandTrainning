import {CardTrainner, Carousel, Header, Modal} from 'components';
import {firestore} from 'firebase';
import {setGymId} from 'functions';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {HomeStyle} from './styles';

const HomeTrainner = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const [gyms, setGyms] = useState<any[]>([]);
  useEffect(() => {
    firestore()
      .collection('users')
      .where('type', '==', 'gym')
      .where('uid', 'in', user.userAssociate)
      .get()
      .then(querySnapshot => {
        const listGyms = querySnapshot.docs.map(doc => doc.data());
        setGyms(listGyms);
      })
      .catch(err => {});
  }, []);
  return (
    <HomeStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} setVisible={setVisible} />
      <Modal
        visible={visible}
        setVisible={setVisible}
        gyms={gyms}
        setGym={setGymId}
        title="Trocar academia"
      />
      <Carousel />
      <CardTrainner />
    </HomeStyle>
  );
};

export default HomeTrainner;
