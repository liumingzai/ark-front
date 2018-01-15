import 'antd/dist/antd.css';
import React from 'react';
import propTypes from 'prop-types';
import { Layout } from 'antd';
import Header from './components/Header';

function App(props) {
  return (
    <Layout>
      <Header />
      {props.children}
    </Layout>
  );
}

App.propTypes = {
  children: propTypes.node.isRequired,
};

export default App;
