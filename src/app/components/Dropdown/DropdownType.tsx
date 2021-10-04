import normalize from '@normalize';
import Colors from '@styles';
import React, {useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

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
        color: error !== '' ? Colors.red : Colors.borderLineColor,
        fontFamily: 'Poppins-Regular',
        fontSize: normalize(15),
      }}
      textStyle={{fontFamily: 'Poppins-Regular', fontSize: normalize(15)}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor: error !== '' ? Colors.redOpacity : Colors.inputBack,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        borderWidth: error !== '' ? 1 : 0,
        borderColor: Colors.red,
        height: 56,
      }}
      dropDownContainerStyle={{
        backgroundColor: Colors.inputBack,
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
