

const buildMovieFilter = (query) => {
     const { genre, watched, rating, search } = query;
     const filter = {};
   
     if (genre) filter.genres = genre;
     if (watched !== undefined) filter.watched = watched === "true";
     if (rating) filter.rating = { $gte: parseInt(rating) };
     if (search) filter.title = new RegExp(search, "i"); // Case-insensitive search for title
   
     return filter;
   };
   
   module.exports = {
     buildMovieFilter,
   };
   