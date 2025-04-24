'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import { Flex, Typography, Button, Select } from 'antd';
import { getDuplicatesNews } from '@/app/api/fakeBackend';
import {
  IData_DuplicateNews,
  IData_SnippetNews,
  Sorting,
} from '@/app/types/data';
import { capitalizeWords } from '@/app/helpers/capitalizeWords/capitalizeWords';
import styles from './CardDuplicates.module.css';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { ShortNewsCard } from '../shortNewsCard/shortNewsCard';

interface CardDuplicatesProps {
  id: IData_SnippetNews['ID'];
}

const { Option } = Select;
const { Text } = Typography;

export const CardDuplicates: FC<CardDuplicatesProps> = ({ id }) => {
  const [duplicateNews, setDuplicateNews] = useState<IData_DuplicateNews[]>([]);
  const [filter, setFilter] = useState<Sorting>(Sorting.BY_RELEVANCE);
  const [showDuplicates, setShowDuplicates] = useState(false);

  const newsToShow = showDuplicates ? duplicateNews : duplicateNews.slice(0, 1);

  const fetchData = useCallback(
    async (filter: Sorting) => {
      try {
        const response = await getDuplicatesNews(id, filter);
        if (response.ok && response.data) {
          setDuplicateNews(response.data);
        }
      } catch (error: Error | unknown) {
        throw error;
      }
    },
    [id, setDuplicateNews]
  );

  useEffect(() => {
    fetchData(filter);
  }, [filter, fetchData]);

  return (
    <Flex
      vertical
      justify="flex-start"
      align="start"
      gap="small"
      className={styles.cardDuplicates}>
      <Flex
        justify="space-between"
        align="center"
        gap={20}
        className={styles.cardDuplicates__filter}>
        <Flex gap={2}>
          <Text style={{ color: 'var(--secondary)' }}>Duplicates:</Text>
          <Text style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
            {duplicateNews.length}
          </Text>
        </Flex>
        {duplicateNews.length > 1 && (
          <Select
            className={styles.cardDuplicates__select}
            placeholder="Borderless"
            variant="borderless"
            defaultValue={Sorting.BY_RELEVANCE}
            onChange={(value) => setFilter(value)}>
            <Option value={Sorting.BY_RELEVANCE}>
              {capitalizeWords(Sorting.BY_RELEVANCE)}
            </Option>
            <Option value={Sorting.BY_DATE}>
              {capitalizeWords(Sorting.BY_DATE)}
            </Option>
          </Select>
        )}
      </Flex>
      {newsToShow.map((item) => (
        <ShortNewsCard news={item} key={item.ID} />
      ))}

      {duplicateNews.length > 1 && (
        <Button
          onClick={() => setShowDuplicates(!showDuplicates)}
          style={{
            width: '100%',
            marginTop: '10px',
            background: 'transparent',
            color: 'var(--secondary)',
          }}>
          {showDuplicates ? (
            <>
              <UpOutlined style={{ color: 'var(--secondary)' }} />
              Hide Duplicates
            </>
          ) : (
            <>
              <DownOutlined style={{ color: 'var(--secondary)' }} />
              View Duplicates
            </>
          )}
        </Button>
      )}
    </Flex>
  );
};
