'use client';
import { FC } from 'react';
import { Card, Flex, Button } from 'antd';
import { CardHeader } from '@/app/components/CardHeader/CardHeader';
import { CardDescription } from '@/app/components/CardDescription/CardDescription';
import { CardDuplicates } from '@/app/components/CardDuplicates/CardDuplicates';
import styles from './NewsCard.module.css';
import type { IData_SnippetNews } from '@/app/types/data';

interface NewsCardProps {
  news: IData_SnippetNews;
}

export const NewsCard: FC<NewsCardProps> = ({ news }) => {
  return (
    <Card hoverable className={styles.card} key={news.ID}>
      <Flex vertical justify="flex-start" align="start" gap="large">
        <CardHeader news={news} onChange={() => {}} />
        <CardDescription news={news} />
        <Button type="link" href={news.URL} className={styles.card__link}>
          Original Source
        </Button>
        <CardDuplicates id={news.ID} />
      </Flex>
    </Card>
  );
};
