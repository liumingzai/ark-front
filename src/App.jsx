import 'primary-style/dist/css/primary-style.min.css';
import 'antd/dist/antd.css';
import React from 'react';
import propTypes from 'prop-types';
import { Layout, BackTop } from 'antd';
import Header from './components/Header';

function App(props) {
  return (
    <Layout>
      <Header />
      {props.children}
      <BackTop />
    </Layout>
  );
}

App.propTypes = {
  children: propTypes.node.isRequired,
};

export default App;
