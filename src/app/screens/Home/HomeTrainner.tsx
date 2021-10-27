import {CardTrainner, Carousel, Header} from 'components';

import {RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';

import {HomeStyle} from './styles';
import Colors from '@styles';

const HomeTrainner = ({navigation}: any) => {
  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => setRefresh(false));
  }, []);
  return (
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
      <Header navigation={navigation} refresh={refresh} />
      <Carousel />
      <CardTrainner navigation={navigation} refresh={refresh} />
    </HomeStyle>
  );
};

export default HomeTrainner;
function wait(arg0: number) {
  throw new Error('Function not implemented.');
}
