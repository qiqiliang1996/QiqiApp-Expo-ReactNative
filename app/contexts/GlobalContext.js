import React, { useState } from 'react';
import colors from '../config/colors';

const GlobalContext = React.createContext({
  colors,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {},
});

export default GlobalContext;
