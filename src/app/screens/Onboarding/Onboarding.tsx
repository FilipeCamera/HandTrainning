import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const Onboarding = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [state, setState] = useState('');
  const [dados, setDados] = useState({});

  useEffect(() => {
    if (user.avatar !== undefined) {
      setDados({
        ...dados,
        uid: user.uid,
        email: user.email,
        avatar: user.avatar,
        name: user.name,
      });
    } else {
      setDados({...dados, uid: user.uid, email: user.email});
    }
  }, []);
  if (state === 'data') {
    return (
      <>
        <Step4
          backStateChange={() => setState('plans')}
          dados={dados}
          setDados={setDados}
          navigation={navigation}
          user={user}
        />
      </>
    );
  }
  if (state === 'plans') {
    return (
      <>
        <Step3
          stateChange={() => setState('data')}
          backStateChange={() => setState('type')}
          dados={dados}
          setDados={setDados}
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
          dados={dados}
          setDados={setDados}
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
