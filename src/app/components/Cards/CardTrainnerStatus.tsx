import React, {useState, useEffect} from 'react';
import {AvatarActive, Text} from 'components';
import {CardTrainnerStatusStyle, styles} from './styles';
import {useSelector} from 'react-redux';

import Notify from 'assets/svg/Notify.svg';
import {View} from 'react-native';
import {firestore} from 'firebase';

const CardTrainnerStatus = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [trainners, setTrainners] = useState<any>([]);

  useEffect(() => {
    firestore()
      .collection('users')
      .where('type', '==', 'trainner')
      .where('userAssociate', 'array-contains', user.uid)
      .get()
      .then(querySnapshot => {
        const trainner = querySnapshot.docs.map(doc => doc.data());
        setTrainners(trainner);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <CardTrainnerStatusStyle style={styles.shadow}>
      {trainners.length !== 0 &&
        trainners.map(trainner => (
          <AvatarActive
            key={trainner.uid}
            avatar={trainner.avatar}
            status={true}
          />
        ))}
      {trainners.length === 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Notify width="90%" />
          <Text
            title="Nenhum treinador associado"
            size={10}
            weight={500}
            color="#d3d3d3"
            center
          />
        </View>
      )}
    </CardTrainnerStatusStyle>
  );
};

export default CardTrainnerStatus;
