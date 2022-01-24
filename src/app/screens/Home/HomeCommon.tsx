import {CardCommon, Header, Modal, Space} from 'components';
import {firestore} from 'firebase';

import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useGetTrainning, useGetUser} from 'hooks';
import {HomeStyle} from './styles';
import Colors from '@styles';
import {RefreshControl} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import {purchased} from 'payments';

const defaultSubId = 'android.test.purchased';

const HomeCommon = ({navigation, purchase}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const {getTrainning} = useGetTrainning();
  const {getUser} = useGetUser();
  const [visible, setVisible] = useState(false);
  const [trainner, setTrainner] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => setRefresh(false));
  }, []);

  const handleRequestTrainner = (description: any) => {
    setLoading(true);
    const data = {
      commonId: user.uid,
      trainnerId: trainner.uid,
      title: 'Solicitação de novo treino',
      desc: user.name,
      preference: description,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    firestore()
      .collection('requests')
      .doc()
      .set(data)
      .then(res => {
        setLoading(false);
        setSend(!send);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTrainning({
      uid: user.uid,
      onComplete: (trainningUser: any) => {
        if (trainningUser) {
          getUser({
            uid: trainningUser.trainnerId,
            onComplete: (users: any) => {
              if (users) {
                setTrainner(users);
                setLoading(false);
              }
            },
            onFail: err => {},
          });
        } else {
          getUser({
            uid: user.trainnerAssociate,
            onComplete: (users: any) => {
              if (users) {
                setTrainner(users);
                setLoading(false);
              } else {
                setLoading(false);
              }
            },
            onFail: err => {},
          });
        }
      },
      onFail: err => {},
    });
  }, [loading, refresh]);

  return (
    <>
      <HomeStyle
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          alignItems: 'center',
          width: '100%',
        }}
        refreshControl={
          <RefreshControl
            progressViewOffset={50}
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={[Colors.red]}
            progressBackgroundColor={Colors.background}
          />
        }
        showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} />
        <Modal
          visible={visible}
          setVisible={setVisible}
          trainner={trainner}
          loading={loading}
          send={send}
          title="Escolha um novo treinador"
          onFunction={(e: string | any) => handleRequestTrainner(e)}
        />
        <CardCommon
          navigation={navigation}
          setVisible={setVisible}
          setSend={setSend}
          setLoading={setLoading}
          refresh={refresh}
        />
      </HomeStyle>
      {!!user && user.plan === 'basic' ? (
        <BannerAd
          size={BannerAdSize.FULL_BANNER}
          unitId="ca-app-pub-4288571417280592/8570033270"
        />
      ) : !!user && user.plan === 'individual' && !purchase ? (
        <BannerAd
          size={BannerAdSize.FULL_BANNER}
          unitId="ca-app-pub-4288571417280592/8570033270"
        />
      ) : null}
    </>
  );
};

export default HomeCommon;
