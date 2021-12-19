import { Image } from 'antd-mobile';
import React from 'react';

const imgWidth = 56;

const UserInfo = () => {
  return (
    <div className='flex justify-start items-center mb-10 text-base'>
      <Image
        src={
          'https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg'
        }
        style={{ borderRadius: '50%', marginRight: '20px' }}
        fit='cover'
        width={imgWidth}
        height={imgWidth}
      />
      <div className='info flex-1 tracking-wide break-all dark:text-white	'>
        <h4>此系列文章是个人对Tailwind &nbsp;处理重复、使工具</h4>
      </div>
    </div>
  );
};

export default UserInfo;
