import React from 'react';
import SearchItem from './SearchItem';

/**
 *
 * props.data = [{
 *  label: '', // filter tag label
 *  key: '', // search key
 *  list: [{
 *    name: '',
 *    value: ''
 *  }]
 * }]
 *
 */

/**
 * SearchList
 * search func, filter list
 *
 * @param {any} props
 * @returns
 */
function SearchList(props) {
  const { data, match } = props;

  const list = data.map(e => <SearchItem match={match} key={e.key} data={e} />);

  return <div>{list}</div>;
}

export default SearchList;
