import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

interface DropDownProps {
  value: string | null;
  onValue: any;
  error: any;
}

const DropdownCategories = ({value, onValue, error}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    async function loadCategories() {
      await firestore()
        .collection('categories')
        .get()
        .then(res => {
          const item = res.docs.map(doc => doc.data());
          setItems(item);
        });
    }
    loadCategories();
  }, []);

  return (
    <DropDownPicker
      placeholder="Selecione uma categoria"
      placeholderStyle={{
        color: error !== '' ? '#FF6859' : '#999999',
        fontFamily: 'Poppins-Regular',
      }}
      textStyle={{fontFamily: 'Poppins-Regular'}}
      listMode="SCROLLVIEW"
      style={{
        backgroundColor: error !== '' ? 'rgba(255, 104, 89, 0.15)' : '#f1f4fa',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        borderWidth: error !== '' ? 1 : 0,
        borderColor: '#FF6859',
        height: 56,
        elevation: 0,
      }}
      dropDownContainerStyle={{
        backgroundColor: '#f1f4fa',
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0,
        paddingVertical: 5,
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

export default DropdownCategories;
