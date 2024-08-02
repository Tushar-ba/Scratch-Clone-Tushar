import React from 'react';

const FloatingMenu = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white backdrop-blur-md border border-gray-300 shadow-lg p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="mb-4">Here's how to use the editor:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Drag and drop Motions/Looks  to the  Action     workspace.</li>
          <li>Click on Motions/Looks to preview them.</li>
          <li>Click on the X  to remove the actions/Looks.</li>
          <li>Make Sure to Run the current action before replaying if you have done any changes or else it will run the previous iteration which you had run and the updated block will not be replayed.</li>
          <li>Use the buttons to run, replay, or clear actions.</li>
          <li>Feel free to rearrange the blocks in the action area itself if you wanna change the sequence and make sure to run it after sequence changing before replaying the actions.</li>
        </ul>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
