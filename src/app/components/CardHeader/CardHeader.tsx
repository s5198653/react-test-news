'use client';
import { FC } from 'react';
import Link from 'next/link';
import { Flex, Typography, Checkbox, Space, Tag, Tooltip, Button } from 'antd';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';
import { IoBookOutline } from 'react-icons/io5';
import Flag from 'react-world-flags';
import { formatDate } from '@/app/helpers/formatDate/formatDate';
import { formatCountry } from '@/app/helpers/formatCountry/formatCountry';
import { formatReach } from '@/app/helpers/formatReach/formatReach';
import styles from './CardHeader.module.css';
import type { IData_DuplicateNews, IData_SnippetNews } from '@/app/types/data';
import { capitalize } from '@/app/helpers/capitalize/capitalize';

interface CardHeaderProps {
  news: IData_SnippetNews | IData_DuplicateNews;
  onChange: () => void;
  type?: 'duplicate' | 'snippet';
}

const { Text, Title } = Typography;

export const CardHeader: FC<CardHeaderProps> = ({
  news,
  onChange,
  type = 'snippet',
}) => {
  return (
    <Space direction="vertical" size="small" className={styles.cardHeader}>
      <Flex justify="space-between" gap={20}>
        <Space size={10} wrap>
          <Flex gap={2}>
            <Text style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
              {formatDate(news.DP)[0]}
            </Text>
            <Text style={{ color: 'var(--secondary)' }}>
              {formatDate(news.DP).slice(1).join(' ')}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Text style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
              {formatReach(news.REACH)}
            </Text>
            <Text style={{ color: 'var(--secondary)' }}>Reach</Text>
          </Flex>
          {'TRAFFIC' in news && (
            <Flex gap={2}>
              <Text style={{ color: 'var(--secondary)' }}>Top Traffic: </Text>
              {news.TRAFFIC.map(({ value, count }) => (
                <div key={value}>
                  <Text style={{ color: 'var(--secondary)' }}>
                    {formatCountry(value) + ' '}
                  </Text>
                  <Text
                    style={{
                      color: 'var(--secondary)',
                      fontWeight: 'bold',
                    }}>{`${Math.round(count * 100)}%`}</Text>
                </div>
              ))}
            </Flex>
          )}
        </Space>
        <Flex gap={10} align="center">
          {'SENT' in news && (
            <Tag
              className={`${styles.cardHeader__sent} ${
                styles[`cardHeader__sent__${news.SENT}`]
              }`}>
              {capitalize(news.SENT)}
            </Tag>
          )}
          <Tooltip placement="bottom" title="some information">
            <Button className={styles.cardHeader__info}>i</Button>
          </Tooltip>
          <Checkbox
            className={styles.cardHeader__checkbox}
            onChange={onChange}
          />
        </Flex>
      </Flex>
      {type === 'snippet' ? (
        <Link href={`/news/${news.ID.toString()}`}>
          <Title
            level={2}
            style={{ color: 'var(--general)', margin: 0, fontSize: 20 }}>
            {news.TI}
          </Title>
        </Link>
      ) : (
        <Title
          level={2}
          style={{ color: 'var(--general)', margin: 0, fontSize: 20 }}>
          {news.TI}
        </Title>
      )}

      <Space size={10} wrap>
        <Flex gap={3} align="center">
          <GlobalOutlined />
          <Link href={news.DOM}>{news.DOM}</Link>
        </Flex>

        <Flex gap={3} align="center">
          <Flag code={news.CNTR_CODE.toUpperCase()} height="10" />
          <Text style={{ color: 'var(--secondary)' }}>{news.CNTR}</Text>
        </Flex>
        {'LANG' in news && (
          <Flex gap={3} align="center">
            <IoBookOutline />
            <Text style={{ color: 'var(--secondary)' }}>{news.LANG}</Text>
          </Flex>
        )}

        {news.AU.length > 0 && (
          <Flex gap={2}>
            <UserOutlined />
            <Text style={{ color: 'var(--secondary)' }}>
              {news.AU.length > 1
                ? `${news.AU.slice(1).join(', ')}, et al.`
                : news.AU[0]}
            </Text>
          </Flex>
        )}
      </Space>
    </Space>
  );
};
