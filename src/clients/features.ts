import {Initial, Register} from 'screens';

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
};

export default features;
