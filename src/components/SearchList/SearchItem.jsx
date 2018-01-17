import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  display: inline-flex;
  margin: 0;
  list-style-type: none;

  li {
    margin-left: 5px;
    margin-right: 5px;
  }

  a {
    padding: 3px 10px;
  }
`;

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
      <Ul>{liList}</Ul>
    </div>
  );
}

export default SearchItem;
