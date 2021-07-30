import React from 'react';

import {TextStyle} from './styles';

interface TextProps {
  title: string;
  size: number;
  weight: number;
  color: string;
  center: boolean;
  style: any;
}

const Text = ({title, ...props}: TextProps) => {
  return <TextStyle {...props}>{title}</TextStyle>;
};

export default Text;
