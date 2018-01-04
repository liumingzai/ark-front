import React from 'react';
import SideNav from '../../components/SideNav';

function Manager() {
  return (
    <section style={{ display: 'flex' }}>
      <SideNav />
      <main>main content</main>
    </section>
  );
}

export default Manager;
