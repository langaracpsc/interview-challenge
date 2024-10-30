import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./pages/MovieList";
import AddMovieForm from "./pages/AddMovieForm";
import Footer from "./Components/Footer"; 
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <MovieList />
                  </div>
                }
              />
              <Route
                path="/add-movie"
                element={
                  <div className="max-w-2xl mx-auto">
                    <AddMovieForm />
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
