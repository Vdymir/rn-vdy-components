import { View, type DimensionValue } from 'react-native';
import React from 'react';

export interface DividerRowProps {
  weight?: number;
  color?: string;
  large?: DimensionValue;
  vertical?: boolean;
}
export function Divider({
  weight = 1,
  color: backgroundColor = 'gray',
  large = '100%',
  vertical = false,
}: DividerRowProps) {
  const width = vertical ? weight : large;
  const height = vertical ? large : weight;
  return <View style={{ width, height, backgroundColor }} />;
}
