import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { Button, Card, Empty, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SchemaField } from '../types';
import { FieldRow } from './FieldRow';

interface SchemaBuilderProps {
  control: Control<{ schema: SchemaField[] }>;
  path: string;
  nestingLevel?: number;
}

export const SchemaBuilder: React.FC<SchemaBuilderProps> = ({ 
  control, 
  path,
  nestingLevel = 0 
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: path as any,
  });

  const handleAddField = () => {
    append({
      id: crypto.randomUUID(),
      keyName: '',
      type: 'String',
      children: [],
    });
  };

  const isTopLevel = nestingLevel === 0;

  const content = (
    <div className="space-y-4">
      {fields.length === 0 ? (
        <Empty
          description="No fields added yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          className="my-8"
        />
      ) : (
        <div className="space-y-2">
          {fields.map((field, index) => (
            <FieldRow
              key={field.id}
              control={control}
              index={index}
              path={path}
              remove={remove}
              nestingLevel={nestingLevel}
            />
          ))}
        </div>
      )}
      
      <div className="flex justify-start">
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAddField}
          size="middle"
          className="hover:border-blue-400 hover:text-blue-400"
        >
          Add Field
        </Button>
      </div>
    </div>
  );

  if (isTopLevel) {
    return (
      <Card 
        title="Schema Builder" 
        className="h-full"
        styles={{
          body: { 
            padding: '24px',
            height: 'calc(100vh - 200px)',
            overflow: 'auto'
          }
        }}
      >
        {content}
      </Card>
    );
  }

  return content;
};