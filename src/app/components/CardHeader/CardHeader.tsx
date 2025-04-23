'use client';
import { FC } from 'react';
import { Flex, Typography, Checkbox, Space, Tag, Tooltip, Button } from 'antd';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';
import { IoBookOutline } from 'react-icons/io5';
import Flag from 'react-world-flags';
import { formatDate } from '@/app/helpers/formatDate/formatDate';
import { formatCountry } from '@/app/helpers/formatCountry/formatCountry';
import { formatReach } from '@/app/helpers/formatReach/formatReach';
import styles from './CardHeader.module.css';
import type { IData_SnippetNews } from '@/app/types/data';
import { capitalize } from '@/app/helpers/capitalize/capitalize';

interface CardHeaderProps {
  news: IData_SnippetNews;
  onChange: () => void;
}

const { Text, Link, Title } = Typography;

export const CardHeader: FC<CardHeaderProps> = ({
  news: { TI, DP, REACH, DOM, LANG, CNTR, AU, TRAFFIC, URL, CNTR_CODE, SENT },
  onChange,
}) => {
  return (
    <Space direction="vertical" size="small">
      <Flex justify="space-between" gap={20}>
        <Space size={10} wrap>
          <Flex gap={2}>
            <Text style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
              {formatDate(DP)[0]}
            </Text>
            <Text style={{ color: 'var(--secondary)' }}>
              {formatDate(DP).slice(1).join(' ')}
            </Text>
          </Flex>
          <Flex gap={2}>
            <Text style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
              {formatReach(REACH)}
            </Text>
            <Text style={{ color: 'var(--secondary)' }}>Reach</Text>
          </Flex>
          <Flex gap={2}>
            <Text style={{ color: 'var(--secondary)' }}>Top Traffic: </Text>
            {TRAFFIC.map(({ value, count }) => (
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
        </Space>
        <Flex gap={10} align="center">
          <Tag
            className={`${styles.card__header__sent} ${
              styles[`card__header__sent__${SENT}`]
            }`}>
            {capitalize(SENT)}
          </Tag>
          <Tooltip placement="bottom" title={URL}>
            <Button className={styles.card__header__info}>i</Button>
          </Tooltip>
          <Checkbox
            className={styles.card__header__checkbox}
            onChange={onChange}
          />
        </Flex>
      </Flex>

      <Link href={TI} target="_blank">
        <Title
          level={2}
          style={{ color: 'var(--general)', margin: 0, fontSize: 20 }}>
          {TI}
        </Title>
      </Link>

      <Space size={10} wrap>
        <Flex gap={3} align="center">
          <GlobalOutlined />
          <Link>{DOM}</Link>
        </Flex>

        <Flex gap={3} align="center">
          <Flag code={CNTR_CODE.toUpperCase()} height="10" />
          <Text style={{ color: 'var(--secondary)' }}>{CNTR}</Text>
        </Flex>
        <Flex gap={3} align="center">
          <IoBookOutline />
          <Text style={{ color: 'var(--secondary)' }}>{LANG}</Text>
        </Flex>

        {AU.length > 0 && (
          <Flex gap={2}>
            <UserOutlined />
            <Text style={{ color: 'var(--secondary)' }}>
              {AU.length > 1 ? `${AU.slice(1).join(', ')}, et al.` : AU[0]}
            </Text>
          </Flex>
        )}
      </Space>
    </Space>
  );
};
