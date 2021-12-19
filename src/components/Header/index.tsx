import React, { useContext } from 'react';
import Switch from 'antd-mobile/es/components/switch';
import { ThemeContext } from '@/context/theme';

function Header() {
  const [isDark, changeDark] = useContext(ThemeContext);

  const onChange = (value: boolean) => {
    changeDark(value);
  };

  return (
    <div className='mb-10 flex justify-between'>
      <h1 className='text-3xl font-serif font-black dark:text-white'>
        Hy的博客~
      </h1>
      <Switch
        uncheckedText='关'
        checkedText='开'
        defaultChecked={isDark}
        onChange={onChange}
      />
    </div>
  );
}

export default Header;
