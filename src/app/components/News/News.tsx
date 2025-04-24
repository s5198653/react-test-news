'use client';
import { FC, useEffect, useState } from 'react';
import { getNewsById } from '@/app/api';
import { Flex, Spin, Typography } from 'antd';
import { IData_SnippetNews } from '@/app/types/data';
import { formatDate } from '@/app/helpers/formatDate/formatDate';

interface NewsProps {
  id: IData_SnippetNews['ID'];
}

const { Text, Title } = Typography;

export const News: FC<NewsProps> = ({ id }) => {
  const [news, setNews] = useState<IData_SnippetNews | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewsById(id);
        if (response.ok && response.data) {
          setNews(response.data);
        }
      } catch (error: Error | unknown) {
        throw error;
      }
    };

    fetchData();
  }, [id]);

  if (!news) {
    return (
      <Flex vertical gap={15}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex
      vertical
      justify="flex-start"
      gap="large"
      style={{ marginBottom: 'auto' }}>
      <Title
        level={2}
        style={{ color: 'var(--general)', margin: 0, fontSize: 20 }}>
        {news.TI}
      </Title>
      <Text>{formatDate(news.DP).slice(1).join(' ')}</Text>
      <Text>{news.AB}</Text>
    </Flex>
  );
};
