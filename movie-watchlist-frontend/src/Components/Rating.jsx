
const Rating = ({ rating, updating, onRatingChange }) => (
  <div className="space-y-3">
    <p className="text-sm font-medium text-gray-500">Rate this movie:</p>
    <select
      value={rating}
      onChange={onRatingChange}
      disabled={updating}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <option key={value} value={value}>
          {value} Star{value > 1 ? 's' : ''}
        </option>
      ))}
    </select>
  </div>
);

export default Rating;
