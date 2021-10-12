import Colors from '@styles';
import React from 'react';
import {View} from 'react-native';

const Card = ({children}: any) => {
  return (
    <View
      style={{
        elevation: 8,
        backgroundColor: Colors.background,
        borderRadius: 30,
        padding: 16,
        width: '100%',
      }}>
      {children}
    </View>
  );
};

export default Card;
