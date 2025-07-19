import { SchemaField } from '../types';

export function convertSchemaToJSON(fields: SchemaField[]): object {
  const result: Record<string, any> = {};
  
  fields.forEach(field => {
    if (!field.keyName.trim()) return; // Skip empty key names
    
    switch (field.type) {
      case 'String':
        result[field.keyName] = "Sample String";
        break;
      case 'Number':
        result[field.keyName] = 123;
        break;
      case 'Nested':
        if (field.children && field.children.length > 0) {
          result[field.keyName] = convertSchemaToJSON(field.children);
        } else {
          result[field.keyName] = {};
        }
        break;
      default:
        result[field.keyName] = null;
    }
  });
  
  return result;
}