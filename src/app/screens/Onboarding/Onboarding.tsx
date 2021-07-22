import React, {useState} from 'react';
import Step1 from './Step1';

const Onboarding = () => {
  const [state, setState] = useState('');
  return (
    <>
      <Step1 />
    </>
  );
};

export default Onboarding;
