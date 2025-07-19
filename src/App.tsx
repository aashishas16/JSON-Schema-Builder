import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Tabs, Layout, Typography, ConfigProvider } from 'antd';
import { SchemaField } from './types';
import { SchemaBuilder } from './components/SchemaBuilder';
import { JsonPreview } from './components/JsonPreview';
import { convertSchemaToJSON } from './utils/transformer';

const { Header, Content } = Layout;
const { Title } = Typography;

interface FormData {
  schema: SchemaField[];
}

function App() {
  const { control } = useForm<FormData>({
    defaultValues: {
      schema: [],
    },
  });

  const watchedSchema = useWatch({
    control,
    name: 'schema',
  });

  const jsonOutput = React.useMemo(() => {
    return convertSchemaToJSON(watchedSchema || []);
  }, [watchedSchema]);

  const tabItems = [
    {
      key: 'builder',
      label: 'Schema Builder',
      children: (
        <SchemaBuilder 
          control={control} 
          path="schema" 
        />
      ),
    },
    {
      key: 'preview',
      label: 'JSON Preview',
      children: (
        <JsonPreview data={jsonOutput} />
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="min-h-screen bg-gray-50">
        <Header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto">
            <Title level={3} className="text-gray-800 mb-0 py-4">
              JSON Schema Builder
            </Title>
          </div>
        </Header>
        
        <Content className="p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs
              defaultActiveKey="builder"
              items={tabItems}
              size="large"
              className="bg-white rounded-lg shadow-sm"
              tabBarStyle={{
                padding: '0 24px',
                margin: 0,
                background: 'white',
                borderRadius: '8px 8px 0 0',
              }}
            />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;