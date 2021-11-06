import React, {useState, useEffect} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import Colors from '@styles';
import normalize from '@normalize';

interface DropDownProps {
  value: string | null;
  onValue: any;
  error: any;
}

const DropdownUF = ({value, onValue, error}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const data = response.data;
        let list: any = [];

        data.map(item => {
          list.push({label: item.sigla, value: item.sigla});
        });
        setItems(list);
      });
  }, []);
  return (
    <DropDownPicker
      placeholder="Estado"
      placeholderStyle={{
        color: error !== '' ? Colors.red : Colors.inputColorText,
        fontFamily: 'Poppins-Regular',
      }}
      textStyle={{fontFamily: 'Poppins-Regular', fontSize: normalize(15)}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor: error !== '' ? Colors.redOpacity : Colors.inputBack,
        borderRadius: 10,
        borderWidth: error !== '' ? 1 : 0,
        borderColor: Colors.red,
        width: 115,
        height: 56,
      }}
      dropDownContainerStyle={{
        backgroundColor: Colors.inputBack,
        borderRadius: 10,
        borderWidth: 0,
        width: 115,
        marginTop: 5,
        elevation: 1,
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

export default DropdownUF;
