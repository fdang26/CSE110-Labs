  import React from 'react';

export const themes = {
 light: {
   mainForeground: '#000000',
   mainBackground: '#eeeeee',
   subForeground: '#000000',
   subBackground: '#eeeeee',
 },
 dark: {
   mainForeground: '#ffffff',
   mainBackground: '#222222',
   subForeground: '#000000',
   subBackground: '#cccccc',
 },
};

export const ThemeContext = React.createContext(themes.light);