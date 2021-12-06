import React, { createContext, useState, useEffect } from 'react';

const darkMode = typeof window !== 'undefined' && window?.matchMedia('(prefers-color-scheme: dark)');
const defaultContext = {
	dark: darkMode?.matches,
};
const ThemeContext = createContext(defaultContext);

export const ThemeProvider = ({ children }) => {
	const [dark, setDark] = useState(false);

	const themeListener = (e) => setDark(e.matches);

	useEffect(() => {
		darkMode.addEventListener('change', themeListener);
	}, []);

	return <ThemeContext.Provider value={dark}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
