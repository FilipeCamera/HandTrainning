import React, {useState, useEffect} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

interface DropDownProps {
  value: string | null;
  onValue: any;
  errors: any;
}

const DropDownUF = ({value, onValue, errors}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const data = response.data;
        let list = [];
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
        color: errors.uf !== '' ? '#FF6859' : '#1C2439',
        fontFamily: 'Poppins-Regular',
      }}
      textStyle={{fontFamily: 'Poppins-Regular'}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor:
          errors.uf !== '' ? 'rgba(255, 104, 89, 0.15)' : '#f1f4fa',
        borderRadius: 10,
        borderWidth: 0,
        width: 100,
        height: 56,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#f1f4fa',
        borderRadius: 10,
        borderWidth: 0,
        width: '35%',
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={onValue}
      setItems={setItems}
    />
  );
};

export default DropDownUF;
