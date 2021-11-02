import React, {useEffect, useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Space, Text} from 'components';
import Moment from 'moment';
import Colors from '@styles';

import DateIcon from 'assets/svg/calendarIconWhite.svg';
import moment from 'moment';

interface DateTimeProps {
  setFinallized: any;
  setInitial: any;
  error: string;
}

const DateTime = ({setFinallized, setInitial, error}: DateTimeProps) => {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState<any>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setInitial(date);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentsDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentsDate);
    setCurrentDate(currentsDate);
    setFinallized(currentsDate);
  };
  return (
    <View style={{width: '90%'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View
            style={{
              backgroundColor: Colors.inputBack,
              flex: 1,
              height: 42,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title={
                currentDate !== ''
                  ? moment(currentDate).format('DD/MM/YYYY')
                  : ''
              }
              size={15}
              weight={500}
              color={Colors.inputColorText}
            />
          </View>
          <Space marginHorizontal={16} />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.red,
              height: 36,
              width: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShow(true)}>
            <DateIcon />
          </TouchableOpacity>
        </View>
      </View>

      {!!show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          dateFormat="shortdate"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DateTime;
