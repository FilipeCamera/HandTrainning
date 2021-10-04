import React, {useEffect, useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'components';
import Moment from 'moment';
import Colors from '@styles';

interface DateTimeProps {
  setFinallized: any;
  setInitial: any;
  error: string;
}

const DateTime = ({setFinallized, setInitial, error}: DateTimeProps) => {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setInitial(date);
  }, []);

  const onChange = (event, selectedDate) => {
    const currentsDate = selectedDate || date;
    setDate(currentsDate);
    setCurrentDate(currentsDate);
    setFinallized(currentsDate);
    setShow(!show);
  };
  return (
    <View style={{width: '90%'}}>
      {!show && !currentDate && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              padding: 12,
              backgroundColor: Colors.inputBack,
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title={Moment(Date.now()).format('DD/MM/YYYY')}
              size={15}
              weight={400}
              color={Colors.textColorBlack}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              padding: 12,
              backgroundColor: error ? Colors.redOpacity : Colors.inputBack,
              borderRadius: 8,
              borderColor: error ? Colors.red : Colors.inputBack,
              borderWidth: error ? 1 : 0,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title="Até"
              size={15}
              weight={400}
              color={error ? Colors.red : Colors.textColorBlack}
            />
          </TouchableOpacity>
        </View>
      )}
      {!show && !!currentDate && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
            style={{
              padding: 12,
              backgroundColor: Colors.inputBack,
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title={Moment(Date.now()).format('DD/MM/YYYY')}
              size={15}
              weight={400}
              color={Colors.textColorBlack}
            />
          </View>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: Colors.inputBack,
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setShow(!show)}>
            <Text
              title={Moment(date).format('DD/MM/YYYY')}
              size={15}
              weight={400}
              color={Colors.textColorBlack}
            />
          </TouchableOpacity>
        </View>
      )}
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
