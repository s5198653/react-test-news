'use client';
import { FC } from 'react';
import { Card, Flex } from 'antd';
import { CardHeader } from '@/app/components/CardHeader/CardHeader';
import styles from './shortNewsCard.module.css';
import type { IData_DuplicateNews } from '@/app/types/data';

interface ShortNewsCardProps {
  news: IData_DuplicateNews;
}

export const ShortNewsCard: FC<ShortNewsCardProps> = ({ news }) => {
  return (
    <Card hoverable className={styles.shortCard} key={news.ID}>
      <Flex vertical justify="flex-start" align="start" gap="large">
        <CardHeader news={news} onChange={() => {}} />
      </Flex>
    </Card>
  );
};
