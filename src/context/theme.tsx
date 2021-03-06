import { THEME_KEY } from '@/config/app';
import { useToggle } from '@/Hooks/useToggle ';
import { getItem, setItem } from '@/utils/localStorage';
import React, { useEffect } from 'react';

export const ThemeContext = React.createContext<any>(null);

function DarkContext(props: any) {
  const [isDark, changeDark] = useToggle(
    (getItem(THEME_KEY) && getItem(THEME_KEY) === 'dark') ||
      (!(THEME_KEY in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={[isDark, changeDark]}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default DarkContext;
