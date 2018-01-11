import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 *
 *
 * @param {any} props
 * @returns
 */
function SearchItem(props) {
  const { data, match } = props;

  const liList = data.list.map(e => (
    <li key={e.value}>
      <NavLink activeClassName="active" to={`${match.path}?${data.key}=${e.value}`}>
        {e.name}
      </NavLink>
    </li>
  ));

  return (
    <div>
      <span>{data.label}</span>
      <ul>{liList}</ul>
    </div>
  );
}

export default SearchItem;
