import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

interface JsonPreviewProps {
  data: object;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data }) => {
  return (
    <Card 
      title="JSON Output" 
      className="h-full"
      styles={{
        body: { 
          padding: '16px',
          height: 'calc(100vh - 200px)',
          overflow: 'auto'
        }
      }}
    >
      <div className="bg-gray-50 p-4 rounded-lg border">
        <Text code className="text-sm">
          <pre 
            className="whitespace-pre-wrap break-words m-0 font-mono text-sm leading-relaxed"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </Text>
      </div>
    </Card>
  );
};