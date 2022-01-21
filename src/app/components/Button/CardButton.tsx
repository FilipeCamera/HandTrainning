import Colors from '@styles';
import {Text} from 'components';
import React from 'react';
import {View} from 'react-native';
import {CardButtonContainer, CardButtonStyle} from './styles';

interface CardButtonProps {
  title: string;
  desc: string;
  onPress: () => any;
}

const CardButton = ({title, desc, onPress}: CardButtonProps) => {
  return (
    <CardButtonStyle onPress={onPress}>
      <CardButtonContainer>
        {!!title && (
          <Text
            title={title}
            weight={600}
            size={18}
            color={Colors.textColorWhite}
          />
        )}
        {!!desc && (
          <View style={{width: '90%'}}>
            <Text
              title={desc}
              weight={400}
              size={12}
              color={Colors.textColorWhite}
              center
            />
          </View>
        )}
      </CardButtonContainer>
    </CardButtonStyle>
  );
};

export default CardButton;
