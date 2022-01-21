import normalize from '@normalize';
import Colors from '@styles';
import {firestore} from 'firebase';
import {useGetUser} from 'hooks';
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
  const {getUserCommonsTrainnerId} = useGetUser();
  const [items, setItems] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    getUserCommonsTrainnerId({
      uid: user.uid,
      onComplete: commons => {
        const list: any = [];
        if (commons) {
          commons.map(common => {
            list.push({value: common.uid, label: common.name});
          });

          setItems(list);
        }
      },
      onFail: err => {},
    });
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
