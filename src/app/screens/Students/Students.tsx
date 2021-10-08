import {Header} from 'components';
import React from 'react';
import {StudentStyle} from './styles';

const Students = () => {
  return (
    <StudentStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
    </StudentStyle>
  );
};

export default Students;
