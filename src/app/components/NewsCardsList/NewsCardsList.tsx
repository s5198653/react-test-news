'use client';
import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { Space, Spin, Button, Alert, Flex } from 'antd';
import { NewsCard } from '@/app/components/NewsCard/NewsCard';
import { getNews } from '@/app/api';
import styles from './NewsCardsList.module.css';
import type { IData_SnippetNews } from '@/app/types/data';
import { LoadingType } from '@/app/types/data';

export const NewsCardsList = () => {
  const [news, setNews] = useState<IData_SnippetNews[]>([]);
  const [isLoading, setIsLoading] = useState<LoadingType>(LoadingType.LOADING);

  const fetchData = async () => {
    setIsLoading(LoadingType.LOADING);
    try {
      const response = await getNews();
      if (response.ok && response.data) {
        setNews(response.data);
        setIsLoading(LoadingType.LOADED);
      } else {
        setIsLoading(LoadingType.ERROR);
      }
    } catch (error: Error | unknown) {
      setIsLoading(LoadingType.ERROR);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex vertical gap={15} align="center">
      {isLoading === LoadingType.ERROR && (
        <Alert
          message="Internal Server Error"
          description="Please, try again!"
          type="error"
          className={styles.alert}
          action={
            <Space>
              <Button
                size="large"
                onClick={fetchData}
                style={{
                  color: 'var(--background)',
                  borderColor: 'var(--positive)',
                }}>
                Reload
              </Button>
            </Space>
          }
        />
      )}

      {isLoading === LoadingType.LOADING && <Spin size="large" />}

      {isLoading === LoadingType.LOADED && (
        <>
          {news.length > 0 ? (
            news.map((el) => <NewsCard news={el} key={el.ID} />)
          ) : (
            <Alert
              message="There is no news yet, please try again later."
              type="info"
            />
          )}
        </>
      )}
    </Flex>
  );
};
