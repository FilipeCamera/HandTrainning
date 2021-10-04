import React from 'react';
import {View} from 'react-native';
import {Text} from 'components';
import {
  BarChartStyle,
  BarLineRed,
  BarLineRedLight,
  LinerCircle,
} from './styles';
import Colors from '@styles';

const BarChart = () => {
  const currentDate = Date.now();
  const data = [
    {
      label: 'Jan',
      valueLose: 0,
      valueWin: 100,
      total: 100,
      date: Date.now(),
    },
    {label: 'Fev', valueLose: 82, valueWin: 206, total: 300, date: new Date()},
    {label: 'Abril', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
    {label: 'Maio', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
    {label: 'Jun', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
    {label: 'Jul', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
    {label: 'Ago', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
    {label: 'Set', valueLose: 32, valueWin: 56, total: 125, date: new Date()},
  ];
  return (
    <BarChartStyle
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
      }}>
      {data.map(item => (
        <View
          key={item.label}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              width: 30,
              marginBottom: 8,
            }}>
            <BarLineRedLight height={item.valueLose} total={item.total} />
            <BarLineRed height={item.valueWin} total={item.total} />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text
              title={item.label}
              size={12}
              weight={item.date === currentDate ? 900 : 500}
              color={
                item.date === currentDate
                  ? Colors.textColorRX
                  : Colors.textGrayMedium
              }
            />
            {item.date === currentDate ? <LinerCircle /> : null}
          </View>
        </View>
      ))}
    </BarChartStyle>
  );
};

export default BarChart;
