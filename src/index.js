import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader';
import SiteFooter from './components/siteFooter';
import MenuContextProvider from "./contexts/menuContext";
import MoviesContextProvider from "./contexts/moviesContext";
const HomePage = lazy(() => import('./pages/HomePage'));
const PopularMoviePage = lazy(() => import('./pages/Movie/PopularMoviePage'));
const UpcomingMoviePage = lazy(() => import('./pages/Movie/UpcomingMoviePage'));
const TopRatedMoviePage = lazy(() => import('./pages/Movie/TopRatedMoviePage'));
const PopularTVPage = lazy(() => import('./pages/TV/PopularTVPage'));
const PopularPeoplePage = lazy(() => import('./pages/People/PopularPeoplePage'));
const ItemDetailPage = lazy(() => import('./pages/Detail/ItemDetailPage'));
const PeopleDetailPage = lazy(() => import('./pages/Detail/PeopleDetailPage'));
const MyFavorite = lazy(() => import('./pages/Account/MyFavorite'));

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
            <Suspense>
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
            </Suspense>
          </MoviesContextProvider>
        </MenuContextProvider>
        <SiteFooter />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);