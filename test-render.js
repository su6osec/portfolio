import React from 'react';
import { renderToString } from 'react-dom/server';
import Hero from './src/components/Hero.jsx';

try {
  renderToString(React.createElement(Hero));
  console.log("SUCCESS");
} catch (e) {
  console.error("RENDER ERROR:", e);
}
