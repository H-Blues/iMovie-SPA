import React from 'react';
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader';
import SiteFooter from './components/siteFooter';
import HomePage from "./pages/HomePage";
import PopularMoviePage from './pages/Movie/PopularMoviePage';
import UpcomingMoviePage from './pages/Movie/UpcomingMoviePage';
import TopRatedMoviePage from './pages/Movie/TopRatedMoviePage';
import DetailPage from './pages/Detail/DetailPage';
import MenuContextProvider from "./contexts/menuContext";
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MenuContextProvider>
          <MoviesContextProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<PopularMoviePage />} />
              <Route path="/movies/:id" element={<DetailPage type='movie' />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviePage />} />
              <Route path="/movies/top-rated" element={<TopRatedMoviePage />} />
              <Route path="/tv" element={<HomePage />} />
              <Route path="/tv/:id" element={<HomePage />} />
              <Route path="/people" element={<HomePage />} />
              <Route path="/people/:id" element={<HomePage />} />
              <Route path="/:user/favourites" element={<HomePage />} />
              <Route path="/:user/watchlist" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </MenuContextProvider>
        <SiteFooter />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);