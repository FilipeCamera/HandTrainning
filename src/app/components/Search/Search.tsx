import React from 'react';

import SearchIcon from 'assets/svg/search.svg';
import {TextInput} from 'react-native';
import {SearchStyle} from './styles';
import {RFValue} from 'react-native-responsive-fontsize';

interface SearchProps {
  user: string;
  onSearch: any;
}

const Search = ({user, onSearch}: SearchProps) => {
  return (
    <SearchStyle>
      <SearchIcon />
      <TextInput
        value={user}
        onChangeText={e => onSearch(e)}
        placeholder="Pesquisar por..."
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: RFValue(15),
          color: '#858C94',
          flex: 1,
        }}
      />
    </SearchStyle>
  );
};

export default Search;
