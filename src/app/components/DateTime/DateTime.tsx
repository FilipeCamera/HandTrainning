import React, {useState} from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'components';
import Moment from 'moment';

const DateTime = () => {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState();
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentsDate = selectedDate || date;
    setDate(currentsDate);
    setCurrentDate(currentsDate);
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
              backgroundColor: '#F1F4FA',
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title={Moment(Date.now()).format('DD/MM/YYYY')}
              size={15}
              weight={400}
              color="#090A0A"
            />
          </View>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={{
              padding: 12,
              backgroundColor: '#F1F4FA',
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text title="Até" size={15} weight={400} color="#090A0A" />
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
              backgroundColor: '#F1F4FA',
              borderRadius: 8,
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              title={Moment(Date.now()).format('DD/MM/YYYY')}
              size={15}
              weight={400}
              color="#090A0A"
            />
          </View>
          <TouchableOpacity
            style={{
              padding: 12,
              backgroundColor: '#F1F4FA',
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
              color="#090A0A"
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
