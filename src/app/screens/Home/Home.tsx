import {useInterstitialAd, TestIds} from '@react-native-admob/admob';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import HomeCommon from './HomeCommon';
import HomeTrainner from './HomeTrainner';

const Home = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const {adLoaded, show} = useInterstitialAd(TestIds.INTERSTITIAL, {
    loadOnDismissed: false,
    requestOptions: {requestNonPersonalizedAdsOnly: true},
  });

  useEffect(() => {
    if (user.plan === 'basic' && adLoaded) {
      show();
    }
  }, [adLoaded]);

  return (
    <>
      {user.type === 'common' && <HomeCommon navigation={navigation} />}
      {user.type === 'trainner' && <HomeTrainner navigation={navigation} />}
    </>
  );
};

export default Home;
