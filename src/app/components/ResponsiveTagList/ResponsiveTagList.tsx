import React, { useState, FC } from 'react';
import { Tag, Button, Flex } from 'antd';
import { IData_TagItem } from '@/app/types/data';
import {
  BankOutlined,
  BugOutlined,
  MobileOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons';

interface ResponsiveTagListProps {
  tags?: IData_TagItem[];
}

export const ResponsiveTagList: FC<ResponsiveTagListProps> = ({ tags }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleTags = showAll ? tags : tags?.slice(0, 3);

  const getIconByTag = (tagValue: string) => {
    const lowerValue = tagValue.toLowerCase();

    switch (true) {
      case lowerValue.includes('mobile'):
        return <MobileOutlined />;
      case lowerValue.includes('virus'):
        return <BugOutlined />;
      case lowerValue.includes('bank'):
        return <BankOutlined />;
      case lowerValue.includes('security'):
        return <SecurityScanOutlined />;
      default:
        return null;
    }
  };

  return (
    <>
      <Flex wrap align="center">
        {visibleTags &&
          visibleTags.map((item, index) => (
            <Tag
              key={index}
              color="transparent"
              style={{
                padding: '5px',
                border: '1px solid var(--secondary-opacity)',
                borderRadius: '15px',
                color: 'var(--secondary)',
              }}>
              <Flex gap={5}>
                {getIconByTag(item.value)}
                <span> {item.value}</span>
                <span style={{ fontWeight: 'bold', paddingLeft: '5px' }}>
                  {item.count}
                </span>
              </Flex>
            </Tag>
          ))}
        {tags && tags.length > 3 && (
          <Button type="link" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Hide' : `Show all +${tags.length}`}
          </Button>
        )}
      </Flex>
    </>
  );
};
