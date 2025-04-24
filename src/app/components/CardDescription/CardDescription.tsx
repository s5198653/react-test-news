'use client';
import { FC, Fragment } from 'react';
import { Flex } from 'antd';
import type { IData_SnippetNews } from '@/app/types/data';
import styles from './CardDescription.module.css';
import { ExpandableText } from '@/app/components/ExpandableText/ExpandableText';
import { ResponsiveTagList } from '@/app/components/ResponsiveTagList/ResponsiveTagList';

interface CardDescriptionProps {
  news: IData_SnippetNews;
}

export const CardDescription: FC<CardDescriptionProps> = ({
  news: { KW, HIGHLIGHTS },
}) => {
  return (
    <Flex
      vertical
      justify="flex-start"
      align="start"
      gap="large"
      className={styles.card__description}>
      <ExpandableText
        text={
          <Fragment>
            {HIGHLIGHTS.map((item, index) => (
              <span
                key={index}
                className={styles.card__description__highlight}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            ))}
          </Fragment>
        }
        maxLines={3}
      />
      <ResponsiveTagList tags={KW} />
    </Flex>
  );
};
