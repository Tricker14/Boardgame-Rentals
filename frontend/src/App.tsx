import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopGames } from './layouts/HomePage/ExploreTopGames';
import { Carousel } from './layouts/HomePage/Carousel';

function App() {
  return (
    <div>
      <Navbar/>
      <ExploreTopGames/>
      <Carousel/>
    </div>
  );
}

export default App;
