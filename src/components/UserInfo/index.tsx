import { Image } from 'antd-mobile';
import React from 'react';

const imgWidth = 56;

const UserInfo = () => {
  return (
    <div className='flex justify-start items-center mb-10 text-base'>
      <Image
        src={
          'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60'
        }
        style={{ borderRadius: '50%', marginRight: '20px' }}
        fit='cover'
        width={imgWidth}
        height={imgWidth}
      />
      <div className='info flex-1 tracking-wide break-all dark:text-white	'>
        <h4>
          hy的前端博客
          <br />
          记录一些常用的东西
        </h4>
      </div>
    </div>
  );
};

export default UserInfo;
