import React, { useContext } from 'react';
import Switch from 'antd-mobile/es/components/switch';
import { ThemeContext } from '@/context/theme';
import { withRouter } from 'react-router';

function Header(props: any) {
  const [isDark, changeDark] = useContext(ThemeContext);

  const onChange = (value: boolean) => {
    changeDark(value);
  };

  return (
    <div className='mb-10 flex justify-between'>
      <h1
        onClick={() => props.history.push('/')}
        className='text-3xl font-black dark:text-white'
      >
        踏遍青山人未老，
      </h1>
      <Switch
        uncheckedText='亮'
        checkedText='暗'
        defaultChecked={isDark}
        onChange={onChange}
        style={{
          '--checked-color': '#0f1114',
          '--height': '30px',
          '--width': '60px'
        }}
      />
    </div>
  );
}

export default withRouter(Header);
