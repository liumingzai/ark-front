import 'antd/dist/antd.css';
import React from 'react';
import propTypes from 'prop-types';
import Header from './components/Header';

function App(props) {
  return (
    <section>
      <Header />
      {props.children}
    </section>
  );
}

App.propTypes = {
  children: propTypes.node.isRequired,
};

export default App;
