import {
  BarChart,
  Board,
  CardStatus,
  CardTrainnerStatus,
  Header,
  Row,
} from 'components';

import {useGetPostAndWarnings, useGetWarnings} from 'hooks';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import HomeStateGym from './HomeStateGym';
import {HomeStyle} from './styles';

const HomeGym = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const {getPosts} = useGetPostAndWarnings();
  const {getWarnings} = useGetWarnings();
  const [warnings, setWarnings] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [state, setState] = useState('');

  useEffect(() => {
    getWarnings({
      uid: user.uid,
      onComplete: (warning: any) => {
        if (warning) {
          setWarnings(warning);
        }
      },
      onFail: err => {},
    });

    getPosts({
      uid: user.uid,
      onComplete: (post: any) => {
        if (post) {
          setPosts(post);
        }
      },
      onFail: err => {},
    });
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
        paddingBottom: 50,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
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
