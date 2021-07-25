type CommonGroup = {
  enabled: true;
  component: React.FC<any>;
};

type PublicGroup = CommonGroup & {
  enabledMethod: {
    email: true;
    google: true;
    apple: false;
    facebook: true;
  };
};

type PrivateGroup = CommonGroup & {};

type ConfigGroup = PublicGroup;
type ConfigPrivateGroup = PrivateGroup;

type FeatureGroup = Record<string, ConfigGroup>;

type PrivateFeatureGroup = Record<string, ConfigPrivateGroup>;
