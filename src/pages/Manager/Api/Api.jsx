import React from 'react';

function Api({ match }) {
  console.warn(match);
  return <h1>The URL: {match.path}</h1>;
}

export default Api;
