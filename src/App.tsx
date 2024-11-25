import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { OfferBuilder } from './components/OfferBuilder';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<OfferBuilder />} />
      </Routes>
    </Layout>
  );
}

export default App;