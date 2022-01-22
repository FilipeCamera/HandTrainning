import {CardTrainner, Header, Space} from 'components';

import {RefreshControl} from 'react-native';
import React, {useCallback, useState} from 'react';

import {HomeStyle} from './styles';
import Colors from '@styles';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import {useSelector} from 'react-redux';

const HomeTrainner = ({navigation, purchase}: any) => {
  const user = useSelector((state: any) => state.auth.user);
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

      <CardTrainner navigation={navigation} refresh={refresh} />
      {!!user && user.plan === 'basic' && (
        <>
          <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
          <Space marginVertical={4} />
        </>
      )}
    </HomeStyle>
  );
};

export default HomeTrainner;
