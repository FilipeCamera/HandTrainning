import React, {useEffect, useState} from 'react';
import {Background} from './styles';

import Runner from 'assets/svg/Runner.svg';
import {Dimensions, Platform, View} from 'react-native';
import {
  CardButton,
  CircleButton,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import Colors from '@styles';
import {requestSubscription, listAvailableSubscriptions} from 'payments';

interface StepProps {
  stateChange: () => any;
  backStateChange: () => any;
  dados: any;
  setDados: any;
}

const itemsSubs = Platform.select({
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
  ],
});

const defaultSubId = 'android.test.purchased';

const Step3 = ({stateChange, backStateChange, dados, setDados}: StepProps) => {
  const {width, height} = Dimensions.get('screen');
  useEffect(() => {
    listAvailableSubscriptions(itemsSubs);
  }, []);
  const handleSubscription = async (plan: string, productId: any) => {
    if (dados.type === 'common' && plan === 'individual') {
      const res = await requestSubscription(productId);
      if (res) {
        setDados({...dados, plan: plan});
        stateChange();
      }
    } else if (dados.type === 'trainner' && plan === 'individual') {
      const res = await requestSubscription(productId);
      if (res) {
        setDados({
          ...dados,
          plan: plan,
          limitTrainning: 'infinito',
        });
        stateChange();
      } else if (dados.type === 'trainner') {
        setDados({
          ...dados,
          plan: plan,
          limitTrainning: 20,
        });
        stateChange();
      } else {
        setDados({...dados, plan: plan});
        stateChange();
      }
    }
  };
  return (
    <Background>
      <Scroll>
        <SimpleHeader
          title="Escolha o seu plano"
          color={Colors.textColorWhite}
          size={18}
          weight={600}
        />
        <Runner
          width={(width / 100) * 55}
          height={(height / 100) * 65}
          style={{
            position: 'absolute',
            right: 0,
            top: (height / 100) * 10,
          }}
        />
        {dados.type === 'common' && (
          <>
            <CardButton
              title="Básico - Grátis"
              desc="Você tem acesso ao aplicativo, mas contém propaganda."
              onPress={() => handleSubscription('basic', defaultSubId)}
            />
            <CardButton
              title="Individual - R$ 8,90 / mês"
              desc="Você tem acesso ao aplicativo sem propaganda."
              onPress={() => handleSubscription('individual', defaultSubId)}
            />
          </>
        )}
        {dados.type === 'trainner' && (
          <>
            <CardButton
              title="Básico - Grátis"
              desc="Nesse plano você tem acesso ao aplicativo, porém vai ter propagande e um limite de criação de 20 treinos"
              onPress={() => handleSubscription('basic', defaultSubId)}
            />
            <CardButton
              title="Individual - R$ 11,90 / mês"
              desc="Nesse plano você tem acesso ao aplicativo sem propagandas e um limite infinito para criar treinos."
              onPress={() => handleSubscription('individual', defaultSubId)}
            />
          </>
        )}
        <Space marginVertical={80} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 25,
            right: 0,
          }}>
          <CircleButton title="1" onPress={backStateChange} />
          <View
            style={{width: 80, height: 2, backgroundColor: Colors.background}}
          />
          <CircleButton title="2" />
          <View
            style={{width: 80, height: 2, backgroundColor: Colors.background}}
          />
        </View>
      </Scroll>
    </Background>
  );
};

export default Step3;
