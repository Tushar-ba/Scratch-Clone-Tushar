import React, { useState, useRef } from 'react';
import { useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Block from './Block';
import DraggableBlock from './DraggableBlock';
import FloatingMenu from './FloatingMenu';

const motionBlocks = ['Move Forward', 'Move Backward', 'Turn Left', 'Turn Right'];
const looksBlocks = ['Say Hello', 'Change Color', 'Hide', 'Show'];

const Editor = () => {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState('bg-blue-500');
  const [actions, setActions] = useState([]);
  const [executedActions, setExecutedActions] = useState([]); // Store actions that have been executed
  const [helloPosition, setHelloPosition] = useState(null);
  const [replaying, setReplaying] = useState(false);
  const [previewAction, setPreviewAction] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true); // State to control instruction menu

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['motion', 'looks'],
    drop: (item) => {
      if (!replaying) { // Only allow adding blocks when not replaying
        setActions((prevActions) => [...prevActions, item.label]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleAction = (action) => {
    switch (action) {
      case 'Move Forward':
        setPosition((prev) => {
          const newPosition = { ...prev, y: Math.max(0, prev.y - 20) };
          extendEditorIfNeeded(newPosition);
          return newPosition;
        });
        break;
      case 'Move Backward':
        setPosition((prev) => {
          const newPosition = {
            ...prev,
            y: Math.min(prev.y + 20, getContainerHeight() - 20),
          };
          extendEditorIfNeeded(newPosition);
          return newPosition;
        });
        break;
      case 'Turn Left':
        setPosition((prev) => {
          const newPosition = { ...prev, x: Math.max(0, prev.x - 20) };
          extendEditorIfNeeded(newPosition);
          return newPosition;
        });
        break;
      case 'Turn Right':
        setPosition((prev) => {
          const newPosition = {
            ...prev,
            x: Math.min(prev.x + 20, getContainerWidth() - 20),
          };
          extendEditorIfNeeded(newPosition);
          return newPosition;
        });
        break;
      case 'Say Hello':
        setHelloPosition({ x: position.x + 20, y: position.y - 20 });
        setTimeout(() => {
          setHelloPosition(null);
        }, 2000);
        break;
      case 'Change Color':
        setColor((prevColor) =>
          prevColor === 'bg-blue-500' ? 'bg-red-500' : 'bg-blue-500'
        );
        break;
      case 'Hide':
        setVisible(false);
        break;
      case 'Show':
        setVisible(true);
        break;
      default:
        break;
    }
  };

  const getContainerWidth = () => {
    const editor = document.querySelector('.editor-container');
    return editor ? editor.offsetWidth : 0;
  };
  
  const getContainerHeight = () => {
    const editor = document.querySelector('.editor-container');
    return editor ? editor.offsetHeight : 0;
  };
  
  

  const handleBlockClick = (action) => {
    setPreviewAction(action);
    handleAction(action);
    setTimeout(() => setPreviewAction(null), 1000);
  };

  const moveBlock = (fromIndex, toIndex) => {
    if (!replaying) { // Allow block movement only if not replaying
      const updatedActions = [...actions];
      const [movedBlock] = updatedActions.splice(fromIndex, 1);
      updatedActions.splice(toIndex, 0, movedBlock);
      setActions(updatedActions);
    }
  };

  const deleteBlock = (index) => {
    if (!replaying) { // Allow block deletion only if not replaying
      const updatedActions = actions.filter((_, i) => i !== index);
      setActions(updatedActions);
    }
  };

  const runActions = () => {
    if (actions.length === 0) {
      alert('No actions to run');
      return;
    }

    setExecutedActions([...actions]); // Store actions to be executed
    setReplaying(true);
    let index = 0;
    const actionSequence = [...actions]; // Use the current actions

    setPosition({ x: 150, y: 150 });
    setHelloPosition(null);
    setVisible(true);
    setColor('bg-blue-500');

    const interval = setInterval(() => {
      if (index >= actionSequence.length) {
        clearInterval(interval);
        setReplaying(false);
        alert('All actions completed');
        return;
      }
      const action = actionSequence[index];
      handleAction(action);
      index += 1;
    }, 1000);
  };

  const replayActions = () => {
    if (executedActions.length === 0) {
      alert('No actions to replay');
      return;
    }

    setReplaying(true);
    let index = 0;
    const actionSequence = [...executedActions]; // Use only executed actions

    setPosition({ x: 150, y: 150 });
    setHelloPosition(null);
    setVisible(true);
    setColor('bg-blue-500');

    const interval = setInterval(() => {
      if (index >= actionSequence.length) {
        clearInterval(interval);
        setReplaying(false);
        alert('Replay completed');
        return;
      }
      const action = actionSequence[index];
      handleAction(action);
      index += 1;
    }, 1000);
  };

  const clearAllActions = () => {
    setActions([]);
    setExecutedActions([]); // Clear executed actions as well
    setPosition({ x: 150, y: 150 });
    setHelloPosition(null);
    setVisible(true);
    setColor('bg-blue-500');
    alert('All actions cleared');
  };

  const extendEditorIfNeeded = (newPosition) => {
    const editor = document.querySelector('.editor-container');
    const editorWidth = getContainerWidth();
    const editorHeight = getContainerHeight();
  
    if (newPosition.x + 40 > editorWidth) {
      editor.style.width = `${editorWidth + 40}px`;
    }
    if (newPosition.y + 40 > editorHeight) {
      editor.style.height = `${editorHeight + 40}px`;
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        {showInstructions ? (
          <FloatingMenu onClose={() => setShowInstructions(false)} />
        ) : (
          <>
            <div className="flex">
              <div className="flex flex-col w-1/3">
                <h3 className="text-xl font-bold">Motion</h3>
                {motionBlocks.map((block) => (
                  <Block key={block} label={block} type="motion" onClick={handleBlockClick} />
                ))}
                <h3 className="text-xl font-bold mt-4">Looks</h3>
                {looksBlocks.map((block) => (
                  <Block key={block} label={block} type="looks" onClick={handleBlockClick} />
                ))}
              </div>
              <div className="w-2/3 p-4 editor-container" ref={drop}>
                <h3 className="text-xl font-bold">Drag your Actions Here </h3>
                {actions.map((action, index) => (
                  <DraggableBlock
                    key={index}
                    label={action}
                    index={index}
                    moveBlock={moveBlock}
                    deleteBlock={deleteBlock}
                  />
                ))}
                <div className="mt-4 flex space-x-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    onClick={runActions}
                  >
                    Run
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                    onClick={replayActions}
                  >
                    Replay
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={clearAllActions}
                  >
                    Clear All Actions
                  </button>
                </div>
              </div>
            </div>
            <div className="relative mt-8">
              <div className="w-full h-auto min-h-64 border border-gray-400 relative bg-gray-100">
                {visible && (
                  <div
                    className={`${color} w-16 h-16 absolute`}
                    style={{
                      top: `${position.y}px`,
                      left: `${position.x}px`,
                      border: '2px solid black',
                    }}
                  >
                    {helloPosition && (
                      <div
                        className="absolute text-red-500 font-bold"
                        style={{
                          top: `${helloPosition.y}px`,
                          left: `${helloPosition.x}px`,
                        }}
                      >
                        Hello!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {previewAction && (
              <div
                className="absolute top-0 left-0 bg-black text-white p-2 rounded"
                style={{
                  top: 10,
                  left: 10,
                  zIndex: 1000,
                }}
              >
                Preview: {previewAction}
              </div>
            )}
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default Editor;
