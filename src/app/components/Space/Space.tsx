import React from 'react';
import {SpaceContainer} from './styles';

interface SpaceProps {
  marginVertical: number;
  marginHorizontal: number;
}

const Space = ({marginVertical, marginHorizontal}: SpaceProps) => {
  return (
    <SpaceContainer
      marginVertical={marginVertical}
      marginHorizontal={marginHorizontal}
    />
  );
};

export default Space;
