import {Initial, Register, Login, Onboarding, Home} from 'screens';

const features: FeatureGroup = {
  Initial: {
    enabled: true,
    component: Initial,
    enabledMethod: {
      google: true,
      email: true,
      facebook: true,
      apple: false,
    },
  },
  Register: {
    enabled: true,
    component: Register,
    enabledMethod: {
      email: true,
      google: true,
      facebook: true,
      apple: false,
    },
  },
  Login: {
    enabled: true,
    component: Login,
    enabledMethod: {
      email: true,
      google: true,
      facebook: true,
      apple: false,
    },
  },
};

const privateFeatures: PrivateFeatureGroup = {
  Home: {
    enabled: true,
    component: Home,
  },
  Onboarding: {
    enabled: true,
    component: Onboarding,
  },
};

export {features as default, privateFeatures};
