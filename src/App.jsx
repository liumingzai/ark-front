import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import propTypes from 'prop-types';
import Header from './components/Header';
// import style from './App.css';

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
