import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EthProvider from './EthProvider';
import { Background, Header } from './components';
import Home from './pages/Home';
import Quest from './pages/Quest';

const App = () => {
  return (
    <BrowserRouter>
      <EthProvider>
        <Background>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quest" element={<Quest />} />
          </Routes>
        </Background>
      </EthProvider>
    </BrowserRouter>
  );
};

export default App;
