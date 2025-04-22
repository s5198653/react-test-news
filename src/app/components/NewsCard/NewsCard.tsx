'use client';
import { FC } from 'react';
import { Card, Flex, Typography, Button } from 'antd';
import type { IData_SnippetNews } from '@/app/types/data';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  news: IData_SnippetNews;
}

const { Text } = Typography;

export const NewsCard: FC<NewsCardProps> = ({ news }) => {
  return (
    <Card hoverable className={styles.card} key={news.ID}>
      <Flex vertical justify="flex-start" align="start" gap="large">
        <Text style={{ color: 'var(--foreground)' }}>CardHeader</Text>
        <Text style={{ color: 'var(--foreground)' }}>CardDescription</Text>
        <Button type="link" href={news.URL} className={styles.card__link}>
          Original Source
        </Button>
        <Text style={{ color: 'var(--foreground)' }}>CardDuplicates</Text>
      </Flex>
    </Card>
  );
};
