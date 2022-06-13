import React, { useState } from 'react';
import colors from '../config/colors';
import GlobalContext from './GlobalContext';

function GlobalContextProvider(props) {
  const [rooms, setRooms] = useState([]);
  const [unfilteredRooms, setUnfilteredRooms] = useState([]);
  return (
    <GlobalContext.Provider
      value={{ colors, rooms, setRooms, unfilteredRooms, setUnfilteredRooms }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
