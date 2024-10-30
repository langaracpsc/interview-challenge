import React from 'react';

const WatchStatus = ({ watched, updating, onToggle }) => (
  <div className="space-y-4">
    <button
      onClick={onToggle}
      disabled={updating}
      className={`
        px-6 py-2 rounded-lg font-medium transition-all duration-200
        ${updating ? 'cursor-not-allowed opacity-50' : ''}
        ${
          watched
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
        }
      `}
    >
      {watched ? 'Status: Watched' : 'Mark as Watched'}
    </button>
    {!watched && <p className="text-sm text-gray-500">Mark the movie as "Watched" to rate it.</p>}
  </div>
);

export default WatchStatus;
