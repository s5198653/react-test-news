'use client';
import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextBase: '#999999',
          colorBgLayout: 'linear-gradient(to bottom right, blue, black)',
        },
      }}>
      {children}
    </ConfigProvider>
  );
};
