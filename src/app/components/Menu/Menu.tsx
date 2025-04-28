'use client';

import React, { useState } from 'react';
import { Menu as AntdMenu } from 'antd';
import { BookOutlined, FormOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'news',
    icon: <BookOutlined />,
    label: <Link href={`/news`}>News</Link>,
  },
  {
    key: 'textarea',
    icon: <FormOutlined />,
    label: <Link href={`/textarea`}>Highlighted textarea</Link>,
  },
];

export const Menu = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <AntdMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
};
