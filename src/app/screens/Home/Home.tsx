import {useInterstitialAd, TestIds} from '@react-native-admob/admob';
import {purchased} from 'payments';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';

import {useSelector} from 'react-redux';
import HomeCommon from './HomeCommon';
import HomeTrainner from './HomeTrainner';

const defaultSubId = 'android.test.purchased';

const Home = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [purchase, setPurchase] = useState(false);
  const {adLoaded, show} = useInterstitialAd(TestIds.INTERSTITIAL, {
    loadOnDismissed: false,
    requestOptions: {requestNonPersonalizedAdsOnly: true},
  });
  const loadPurchase = async () => {
    const res = await purchased(defaultSubId);
    setPurchase(res);
  };
  useEffect(() => {
    loadPurchase();
  }, [purchase]);

  const handleExitApp = () => {
    BackHandler.exitApp();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleExitApp,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if ((user.plan === 'basic' && adLoaded) || (!purchase && adLoaded)) {
      show();
    }
  }, [adLoaded, purchase]);

  return (
    <>
      {user.type === 'common' && (
        <HomeCommon navigation={navigation} purchase={purchase} />
      )}
      {user.type === 'trainner' && (
        <HomeTrainner navigation={navigation} purchase={purchase} />
      )}
    </>
  );
};

export default Home;
