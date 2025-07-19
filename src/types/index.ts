export type FieldType = 'String' | 'Number' | 'Nested';

export interface SchemaField {
  id: string; // Required by useFieldArray
  keyName: string;
  type: FieldType;
  children?: SchemaField[]; // Recursive children for 'Nested' type
}