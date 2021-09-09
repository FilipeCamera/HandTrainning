import React, {useState} from 'react';

import {Row, Text, ButtonText, Space} from 'components';
import {BoardStyle, ButtonTap, styles} from './styles';
import {Image, View} from 'react-native';
import moment from 'moment';
import {firestore} from 'firebase';

interface BoardProps {
  title: string;
  data: any;
  visualPress: () => any;
}

const Board = ({title, data, visualPress}: BoardProps) => {
  const date = new Date(
    firestore.Timestamp.now().seconds * 1000,
  ).toLocaleDateString();
  const [active, setActive] = useState({
    today: true,
    week: false,
  });
  return (
    <BoardStyle style={styles.shadow}>
      <Row noMargin>
        <Text title={title} size={18} weight={600} color="#090A0A" />
        <ButtonText
          title="Visualizar todos"
          size={12}
          weight={500}
          color="#FF6859"
          onPress={visualPress}
        />
      </Row>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ButtonTap
          active={active.today}
          onPress={() => setActive({today: true, week: false})}>
          <Text
            title="Hoje"
            size={13}
            weight={500}
            color={active.today ? '#FF6859' : '#C4C4C4'}
          />
        </ButtonTap>
        <ButtonTap
          active={active.week}
          onPress={() => setActive({today: false, week: true})}>
          <Text
            title="Semana"
            size={13}
            weight={500}
            color={active.week ? '#FF6859' : '#C4C4C4'}
          />
        </ButtonTap>
      </View>
      <Space marginVertical={10} />
      {!!data &&
        data.map((item, index) => {
          if (index >= 3) {
            return;
          }
          if (
            active.today &&
            moment(date).isSame(
              moment(item.initial.seconds * 1000).format('MM/DD/YY'),
            )
          ) {
            return (
              <View
                key={item.title}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {!!item.image && (
                    <View style={{width: 60, height: 60, borderRadius: 20}}>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 20,
                        }}
                      />
                    </View>
                  )}
                  {!!item.image && <Space marginHorizontal={8} />}
                  <Text
                    title={item.title}
                    size={12}
                    weight={500}
                    color="#090a0a"
                  />
                </View>
                {moment(date).isAfter(
                  moment(item.finallized.seconds * 1000).format('MM/DD/YY'),
                ) && (
                  <View
                    style={{
                      backgroundColor: '#DCFFB2',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                    }}>
                    <Text
                      title="Finalizado"
                      weight={500}
                      size={10}
                      color="#4CAF50"
                    />
                  </View>
                )}
              </View>
            );
          }
          if (
            active.week &&
            moment(date).isAfter(
              moment(item.initial.seconds * 1000).format('MM/DD/YY'),
            )
          ) {
            return (
              <View
                key={item.title}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {!!item.image && (
                    <View style={{width: 60, height: 60, borderRadius: 20}}>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 20,
                        }}
                      />
                    </View>
                  )}
                  {!!item.image && <Space marginHorizontal={8} />}
                  <Text
                    title={item.title}
                    size={12}
                    weight={500}
                    color="#090a0a"
                  />
                </View>
                {moment(item.finallized).format('DD/MM/YYYY') <=
                  moment(Date.now()).format('DD/MM/YYYY') && (
                  <View
                    style={{
                      backgroundColor: '#DCFFB2',
                      paddingVertical: 4,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                    }}>
                    <Text
                      title="Finalizado"
                      weight={500}
                      size={10}
                      color="#4CAF50"
                    />
                  </View>
                )}
              </View>
            );
          }
        })}
    </BoardStyle>
  );
};

export default Board;
