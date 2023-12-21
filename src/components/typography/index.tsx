import { Text, type TextProps } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { ColorValue } from 'react-native';

export type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';
export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined;

export interface TypographyProps extends TextProps {
  variant?: Variant;
  textTransform?: 'uppercase' | 'none' | 'capitalize' | 'lowercase';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  color?: ColorValue;
  lineHeight?: number;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export function Typography({
  variant = 'p',
  textTransform,
  textDecorationLine,
  lineHeight,
  style,
  fontSize,
  fontWeight,
  textAlign,
  fontStyle,
  color,
  ...rest
}: TypographyProps) {
  const _fontSize = fontSize ?? styles[variant].fontSize;
  const _fontWeight = fontWeight ?? styles[variant].fontWeight;
  return (
    <Text
      {...rest}
      style={[
        styles[variant],
        {
          fontSize: _fontSize,
          fontWeight: _fontWeight,
          textTransform,
          textDecorationLine,
          lineHeight,
          color,
          fontStyle,
          textAlign,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 30,
    fontWeight: '900',
  },
  h2: {
    fontSize: 26,
    fontWeight: '800',
  },
  h3: {
    fontSize: 22,
    fontWeight: '700',
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
  },
  h5: {
    fontSize: 18,
    fontWeight: '500',
  },
  p: {
    fontSize: 14,
    fontWeight: '400',
  },
});
