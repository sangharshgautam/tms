import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from 'lucide-react';
import UnitTestSummary from "./components/UnitTestSummary";

function App() {
  return (
    <div className="App">
        <Home />
      <header className="App-header">
        <UnitTestSummary />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
        <section></section>
    </div>
  );
}

export default App;
