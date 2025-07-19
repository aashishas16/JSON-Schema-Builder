import React from 'react';
import { Controller, Control, useWatch } from 'react-hook-form';
import { Input, Select, Button, Row, Col, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { SchemaField, FieldType } from '../types';
import { SchemaBuilder } from './SchemaBuilder';

const { Option } = Select;

interface FieldRowProps {
  control: Control<{ schema: SchemaField[] }>;
  index: number;
  path: string;
  remove: (index: number) => void;
  nestingLevel?: number;
}

export const FieldRow: React.FC<FieldRowProps> = ({ 
  control, 
  index, 
  path, 
  remove,
  nestingLevel = 0 
}) => {
  const watchedType = useWatch({
    control,
    name: `${path}.${index}.type` as any,
  });

  const isNested = watchedType === 'Nested';
  const marginLeft = nestingLevel * 24;

  return (
    <div className="mb-4" style={{ marginLeft }}>
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} sm={8} md={6}>
          <Controller
            name={`${path}.${index}.keyName` as any}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Key name"
                size="middle"
                className="w-full"
              />
            )}
          />
        </Col>
        
        <Col xs={24} sm={8} md={6}>
          <Controller
            name={`${path}.${index}.type` as any}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select type"
                size="middle"
                className="w-full"
              >
                <Option value="String">String</Option>
                <Option value="Number">Number</Option>
                <Option value="Nested">Nested Object</Option>
              </Select>
            )}
          />
        </Col>
        
        <Col xs={24} sm={8} md={12}>
          <Space className="w-full justify-between">
            <div className="flex-1">
              {isNested && (
                <span className="text-gray-500 text-sm italic">
                  Nested object - add children below
                </span>
              )}
            </div>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => remove(index)}
              size="middle"
              className="ml-auto"
            />
          </Space>
        </Col>
      </Row>

      {isNested && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-700">
              Nested fields for "{useWatch({ control, name: `${path}.${index}.keyName` as any }) || 'untitled'}"
            </span>
          </div>
          <SchemaBuilder
            control={control}
            path={`${path}.${index}.children`}
            nestingLevel={nestingLevel + 1}
          />
        </div>
      )}
    </div>
  );
};