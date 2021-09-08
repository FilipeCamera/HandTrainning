import {
  BarChart,
  Board,
  CardStatus,
  CardTrainnerStatus,
  Header,
  Row,
} from 'components';
import {firestore} from 'firebase';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {HomeStyle} from './styles';

const HomeGym = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [warnings, setWarnings] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    firestore()
      .collection('warning')
      .where('gym', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const warningList = querySnapshot.docs.map(doc => doc.data());
        setWarnings(warningList);
      })
      .catch(error => {});
    firestore()
      .collection('posts')
      .where('gym', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const postsList = querySnapshot.docs.map(doc => doc.data());
        setPosts(postsList);
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
      <Header />
      <BarChart />
      <Row>
        <CardTrainnerStatus />
        <CardStatus />
      </Row>
      <Board title="Mural de Avisos" data={warnings} />
      <Board title="Mural de Post" data={posts} />
    </HomeStyle>
  );
};

export default HomeGym;
