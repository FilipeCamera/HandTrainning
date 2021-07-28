import React from 'react';
import {ScrollView} from 'react-native';

const Scroll = ({children}: any) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default Scroll;
