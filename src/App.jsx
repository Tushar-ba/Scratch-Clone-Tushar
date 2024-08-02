import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Editor from './components/Editor';
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
    <Editor />
  </DndProvider>
);

export default App