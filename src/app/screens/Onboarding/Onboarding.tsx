import React, {useState} from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const Onboarding = () => {
  const [state, setState] = useState('');
  if (state === 'data') {
    return (
      <>
        <Step4 backStateChange={() => setState('plans')} />
      </>
    );
  }
  if (state === 'plans') {
    return (
      <>
        <Step3
          stateChange={() => setState('data')}
          backStateChange={() => setState('type')}
        />
      </>
    );
  }
  if (state === 'type') {
    return (
      <>
        <Step2
          stateChange={() => setState('plans')}
          backStateChange={() => setState('type')}
        />
      </>
    );
  }
  return (
    <>
      <Step1 stateChange={() => setState('type')} />
    </>
  );
};

export default Onboarding;
