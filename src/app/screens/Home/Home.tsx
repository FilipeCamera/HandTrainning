import {useInterstitialAd, TestIds} from '@react-native-admob/admob';
import {purchased, listAvailableSubscriptions} from 'payments';
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
import HomeCommon from './HomeCommon';
import HomeTrainner from './HomeTrainner';

const itemsSubs = Platform.select({
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
  ],
});

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
    listAvailableSubscriptions(itemsSubs);
    loadPurchase();
  }, [purchase]);

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
