import React from 'react';
import BitField from './components/BitField';
import { BitVisualizer } from './components/BitVisualizer';
import {randomColor} from './utils/Utilities'

function App() {
  let queryString = new URLSearchParams(window.location.search);
  let value = queryString.get('value');
  let fields = queryString.get('bitFields');
  let bitFields: BitField[] = [];
  if (fields) {
    try {
      bitFields = JSON.parse(fields);
      for (const bitField of bitFields) {
        bitField.color = randomColor();
      }
    }
    catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <BitVisualizer 
        initialValue={BigInt(value ? value : 0)}
        initialBitFields={bitFields}
      />
    </>
  );
}

export default App;
