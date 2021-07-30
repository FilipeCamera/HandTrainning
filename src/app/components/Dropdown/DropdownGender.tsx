import React, {useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

interface DropDownProps {
  value: string | null;
  onValue: any;
  error: any;
}

const DropdownGender = ({value, onValue, error}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([
    {value: 'man', label: 'Masculino'},
    {value: 'woman', label: 'Feminino'},
  ]);

  return (
    <DropDownPicker
      placeholder="Sexo"
      placeholderStyle={{
        color: error !== '' ? '#FF6859' : '#1C2439',
        fontFamily: 'Poppins-Regular',
      }}
      textStyle={{fontFamily: 'Poppins-Regular'}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor: error !== '' ? 'rgba(255, 104, 89, 0.15)' : '#f1f4fa',
        borderRadius: 10,
        borderWidth: error !== '' ? 1 : 0,
        borderColor: '#FF6859',
        height: 56,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#f1f4fa',
        borderRadius: 10,
        borderWidth: 0,
        paddingVertical: 5,
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

export default DropdownGender;
