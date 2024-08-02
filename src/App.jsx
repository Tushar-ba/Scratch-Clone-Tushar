
import React from 'react';
import ReactDOM from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from './components/Editor';
import './index.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <DndProvider backend={HTML5Backend}>
    <Editor />
  </DndProvider>
);

export default App;