import {CardCommon, Carousel, Header, Modal} from 'components';
import {firestore} from 'firebase';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {HomeStyle} from './styles';

const HomeCommon = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const [trainners, setTrainners] = useState<any[]>([]);
  useEffect(() => {
    firestore()
      .collection('users')
      .where('type', '==', 'trainner')
      .where('userAssociate', 'array-contains', user.userAssociate)
      .get()
      .then(querySnapshot => {
        const trainner = querySnapshot.docs.map(doc => doc.data());
        setTrainners(trainner);
      })
      .catch(error => {});
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
      <Modal
        visible={visible}
        setVisible={setVisible}
        trainners={trainners}
        title="Escolha um novo treinador"
      />
      <Header />
      <Carousel />
      <CardCommon navigation={navigation} setVisible={setVisible} />
    </HomeStyle>
  );
};

export default HomeCommon;
