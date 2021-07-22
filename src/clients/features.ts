import {Initial, Register, Login, Onboarding} from 'screens';

const features: FeatureGroup = {
  Initial: {
    enabled: true,
    component: Initial,
  },
  Register: {
    enabled: true,
    component: Register,
    enabledMethod: {
      google: true,
      facebook: true,
      apple: false,
    },
  },
  Login: {
    enabled: true,
    component: Login,
    enabledMethod: {
      google: true,
      facebook: true,
      apple: false,
    },
  },
  Onboarding: {
    enabled: true,
    component: Onboarding,
  },
};

export default features;
