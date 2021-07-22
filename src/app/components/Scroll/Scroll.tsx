import React from 'react';
import {ScrollView} from 'react-native';

const Scroll = ({children}: any) => {
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1, padding: 16}}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default Scroll;
