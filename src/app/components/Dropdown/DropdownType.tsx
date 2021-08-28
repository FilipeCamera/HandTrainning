import React, {useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import {RFValue} from 'react-native-responsive-fontsize';

interface DropDownProps {
  value: string | null;
  onValue: any;
  error: any;
}

const DropdownType = ({value, onValue, error}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([
    {value: 'solo', label: 'Solo'},
    {value: 'double', label: 'Duplo'},
  ]);

  return (
    <DropDownPicker
      placeholder="Selecione um tipo"
      placeholderStyle={{
        color: error !== '' ? '#FF6859' : '#999999',
        fontFamily: 'Poppins-Regular',
        fontSize: RFValue(15),
      }}
      textStyle={{fontFamily: 'Poppins-Regular', fontSize: RFValue(15)}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor: error !== '' ? 'rgba(255, 104, 89, 0.15)' : '#f1f4fa',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        borderWidth: error !== '' ? 1 : 0,
        borderColor: '#FF6859',
        height: 56,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#f1f4fa',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0,
        paddingVertical: 5,
        marginTop: 5,
      }}
      scrollViewProps={{showsVerticalScrollIndicator: false}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onValue}
      setItems={setItems}
    />
  );
};

export default DropdownType;
