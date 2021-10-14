import normalize from '@normalize';
import Colors from '@styles';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';

import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

interface DropDownProps {
  value: string | null;
  onValue: any;
  error: any;
}

const DropdownStudents = ({value, onValue, error}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  const gym = useSelector((state: any) => state.trainner.gym);

  useEffect(() => {
    async function loadCategories() {
      await firestore()
        .collection('users')
        .where('type', '==', 'common')
        .where('userAssociate', '==', gym.gym)
        .get()
        .then(res => {
          const list = [];
          const item = res.docs.map(doc => doc.data());
          item.map(student => {
            list.push({value: student.uid, label: student.name});
          });
          setItems(list);
        });
    }
    loadCategories();
  }, []);

  return (
    <DropDownPicker
      placeholder="Selecione um aluno"
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
        elevation: 0,
      }}
      dropDownContainerStyle={{
        backgroundColor: Colors.inputBack,
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

export default DropdownStudents;
