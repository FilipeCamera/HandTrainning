import React from 'react';

import {TextStyle} from './styles';

interface TextProps {
  title: string;
  size: number;
  weight: number;
  color: string;
  center: boolean;
  style: any;
  numberOfLines: number;
  ellipsizeMode: string;
}

const Text = ({title, ...props}: TextProps) => {
  return (
    <TextStyle {...props} adjustsFontSizeToFit>
      {title}
    </TextStyle>
  );
};

export default Text;
