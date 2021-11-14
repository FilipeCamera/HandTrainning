import {CardTrainner, Carousel, Header} from 'components';

import {RefreshControl, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {HomeStyle, NotifyStyle} from './styles';
import Colors from '@styles';
import {useSelector} from 'react-redux';
import Notify from 'assets/svg/Notify.svg';

const HomeTrainner = ({navigation}: any) => {
  const gym = useSelector((state: any) => state.trainner.gym);
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
      {!!gym && !!gym.gym && (
        <>
          <Carousel refresh={refresh} />
          <CardTrainner navigation={navigation} refresh={refresh} />
        </>
      )}
      {!gym && (
        <NotifyStyle>
          <Notify />
        </NotifyStyle>
      )}
    </HomeStyle>
  );
};

export default HomeTrainner;
