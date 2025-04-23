import React, { useState } from 'react';
import { Typography, Flex } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './ExpandableText.module.css';

const { Paragraph } = Typography;

interface ExpandableTextProps {
  text: React.ReactNode;
  maxLines?: number;
}

export const ExpandableText = ({ text, maxLines = 3 }: ExpandableTextProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>
        {`
        .ant-typography .ant-typography-expand {
          display: block;
          margin-top: 5px;
          margin-inline-start: 0;
          cursor: pointer;
        }
        .ant-typography .ant-typography-collapse{
          display: block;
          margin-top: 5px;
          margin-inline-start: 0;
          cursor: pointer;
        }
    `}
      </style>
      <Paragraph
        ellipsis={{
          rows: maxLines,
          expandable: 'collapsible',
          expanded,
          onExpand: (_, info) => setExpanded(info.expanded),
          symbol: expanded ? (
            <Flex gap="4px" align="center">
              <span>Show Less</span>
              <CaretUpOutlined style={{ color: 'var(--general)' }} />
            </Flex>
          ) : (
            <Flex gap="4px" align="center">
              <span>Show More</span>
              <CaretDownOutlined style={{ color: 'var(--general)' }} />
            </Flex>
          ),
        }}
        style={{
          width: '100%',
          color: 'var(--foreground)',
          margin: 0,
          paddingTop: 5,
          lineHeight: 2,
        }}>
        {text}
      </Paragraph>
    </>
  );
};
