import {CardCommon, Carousel, Header, Modal} from 'components';
import {firestore} from 'firebase';
import {useGetUser} from 'hooks';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {HomeStyle} from './styles';

const HomeCommon = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const {getUserTrainner} = useGetUser();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [trainners, setTrainners] = useState<any[]>([]);
  const [trainner, setTrainner] = useState<any>();
  useEffect(() => {
    if (user.userAssociate !== undefined) {
      getUserTrainner({
        uid: user.userAssociate,
        onComplete: users => {
          if (users) {
            setTrainners(users);
          }
        },
        onFail: err => {},
      });
    }
  }, []);

  const handleRequestTrainner = () => {
    setLoading(!loading);
    const data = {
      commonId: user.uid,
      trainnerId: trainner,
      title: 'Novo treino',
      desc: `${user.name} solicitou um novo treino`,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    firestore()
      .collection('requests')
      .doc()
      .set(data)
      .then(res => {
        setLoading(!loading);
        setSend(!send);
      })
      .catch(err => console.log(err));
  };

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
        loading={loading}
        send={send}
        setTrainner={setTrainner}
        title="Escolha um novo treinador"
        onFunction={() => handleRequestTrainner()}
      />
      <Header navigation={navigation} />
      <Carousel />
      <CardCommon
        navigation={navigation}
        setVisible={setVisible}
        setSend={setSend}
        setLoading={setLoading}
      />
    </HomeStyle>
  );
};

export default HomeCommon;
