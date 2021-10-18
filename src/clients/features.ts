import {
  Initial,
  Register,
  Login,
  Onboarding,
  Dashboard,
  Warnings,
  Loading,
} from 'screens';

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
  Dashboard: {
    enabled: true,
    component: Dashboard,
  },
  Onboarding: {
    enabled: true,
    component: Onboarding,
  },
  Warnings: {
    enabled: true,
    component: Warnings,
  },
  Loading: {
    enabled: true,
    component: Loading,
  },
};

export {features as default, privateFeatures};
