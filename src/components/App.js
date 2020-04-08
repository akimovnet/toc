import React from 'react';
import TOC from "./TOC";
import {TOCProvider} from "./TOCProvider";

function App() {
  return (
    <div className="App">
      <TOCProvider>
        <TOC />
      </TOCProvider>
    </div>
  );
}

export default App;
