import React, {useState} from 'react';

import {Row, Text, ButtonText} from 'components';
import {BoardStyle, ButtonTap, styles} from './styles';
import {View} from 'react-native';

interface BoardProps {
  title: string;
}

const Board = ({title}: BoardProps) => {
  const [active, setActive] = useState({
    today: true,
    week: false,
    month: false,
  });
  return (
    <BoardStyle style={styles.shadow}>
      <Row noMargin>
        <Text title={title} size={20} weight={600} color="#090A0A" />
        <ButtonText
          title="Visualizar todos"
          size={12}
          weight={500}
          color="#FF6859"
          onPress={() => {}}
        />
      </Row>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ButtonTap
          active={active.today}
          onPress={() => setActive({today: true, week: false, month: false})}>
          <Text
            title="Hoje"
            size={13}
            weight={500}
            color={active.today ? '#FF6859' : '#C4C4C4'}
          />
        </ButtonTap>
        <ButtonTap
          active={active.week}
          onPress={() => setActive({today: false, week: true, month: false})}>
          <Text
            title="1 Semana"
            size={13}
            weight={500}
            color={active.week ? '#FF6859' : '#C4C4C4'}
          />
        </ButtonTap>
        <ButtonTap
          active={active.month}
          onPress={() => setActive({today: false, week: false, month: true})}>
          <Text
            title="1 Mês"
            size={13}
            weight={500}
            color={active.month ? '#FF6859' : '#C4C4C4'}
          />
        </ButtonTap>
      </View>
    </BoardStyle>
  );
};

export default Board;
