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
import HomeStateGym from './HomeStateGym';
import {HomeStyle} from './styles';

const HomeGym = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [warnings, setWarnings] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [state, setState] = useState('');

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

  if (state === 'warnings') {
    return (
      <HomeStateGym
        title="Avisos"
        data={warnings}
        onBack={setState}
        setData={setWarnings}
        type="warning"
      />
    );
  }
  if (state === 'posts') {
    return (
      <HomeStateGym
        title="Postagens"
        data={posts}
        onBack={setState}
        setData={setPosts}
        type="posts"
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
      <Header />
      <BarChart />
      <Row>
        <CardTrainnerStatus />
        <CardStatus />
      </Row>
      <Board
        title="Mural de Avisos"
        data={warnings}
        visualPress={() => setState('warnings')}
      />
      <Board
        title="Mural de Post"
        data={posts}
        visualPress={() => setState('posts')}
      />
    </HomeStyle>
  );
};

export default HomeGym;
