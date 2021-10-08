import {CardTrainner, Carousel, Header} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import HomeWarReq from './HomeWarReq';
import {HomeStyle} from './styles';

const HomeTrainner = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [requests, setRequests] = useState<any[]>([]);
  const [warnings, setWarnings] = useState<any[]>([]);
  const [warReq, setWarReq] = useState(false);
  useEffect(() => {
    firestore()
      .collection('requests')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const request = querySnapshot.docs.map(doc => doc.data());
        setRequests(request);
      })
      .catch(err => {});
    firestore()
      .collection('warning')
      .where('gym', 'in', user.userAssociate)
      .get()
      .then(querySnapshot => {
        const warning = querySnapshot.docs.map(doc => doc.data());

        setWarnings(warning);
      });
  }, []);

  if (warReq === true) {
    return (
      <HomeWarReq
        requests={requests}
        warnings={warnings}
        onBack={e => setWarReq(e)}
      />
    );
  }

  return (
    <HomeStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header
        requests={requests.length}
        warnings={warnings.length}
        setWarReq={() => setWarReq(true)}
      />
      <Carousel />
      <CardTrainner />
    </HomeStyle>
  );
};

export default HomeTrainner;
