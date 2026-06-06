import React from 'react';
import Landingheader from '../header/Header';
import Content from '../content/Content';
import Footer from '../../../components/shared/footer/Footer';

export default function LandingPage() {
  return (
    <div>
      <Landingheader />
      <div style={{ minHeight: '2750px' }}>
        <Content />
      </div>
      <Footer />
    </div>
  );
}
