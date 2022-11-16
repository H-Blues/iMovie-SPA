import React from 'react';

const list = [
  {
    Movies: ['Popular', 'Upcoming', 'Top Rated'],
    TV_Shows: ['Popular'],
    People: ['Popular People'],
  },
];

const path = [
  {
    Movies: ['/movie', '/movie/upcoming', '/movie/top-rated'],
    TV_Shows: ['/tv'],
    People: ['/people'],
  },
];

export const MenuContext = React.createContext({ list: list, path: path });

const MenuContextProvider = (props) => {
  return (
    <MenuContext.Provider value={{ list: list, path: path }}>{props.children}</MenuContext.Provider>
  );
};
export default MenuContextProvider;
