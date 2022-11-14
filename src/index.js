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
import PopularTVPage from './pages/TV/PopularTVPage';
import PopularPeoplePage from './pages/People/PopularPeoplePage';
import ItemDetailPage from './pages/Detail/ItemDetailPage';
import PeopleDetailPage from './pages/Detail/PeopleDetailPage';
import MyFavorite from './pages/Account/MyFavorite';
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
              <Route path="/movie" element={<PopularMoviePage />} />
              <Route path="/movie/:id" element={<ItemDetailPage type='movie' />} />
              <Route path="/movie/upcoming" element={<UpcomingMoviePage />} />
              <Route path="/movie/top-rated" element={<TopRatedMoviePage />} />
              <Route path="/tv" element={<PopularTVPage />} />
              <Route path="/tv/:id" element={<ItemDetailPage type='tv' />} />
              <Route path="/people" element={<PopularPeoplePage />} />
              <Route path="/people/:id" element={<PeopleDetailPage />} />
              <Route path="/account/favourite" element={<MyFavorite />} />
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