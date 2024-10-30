
const MoviePoster = ({ src, alt }) => (
  <img
    className="w-full h-64 object-cover rounded-md mb-6"
    src={src}
    alt={alt}
  />
);

export default MoviePoster;
