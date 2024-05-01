import React from 'react';
import {
  Linking,
  Text,
  Pressable,
  StyleSheet,
  type TextProps,
} from 'react-native';

export interface LinkProps extends TextProps {
  href: string;
}

export function Link({ href, style, ...rest }: LinkProps) {
  const handlePress = React.useCallback(async () => {
    const supported = await Linking.canOpenURL(href);
    if (supported) {
      await Linking.openURL(href);
    } else {
      throw new Error(`Don't know how to open this URL: ${href}`);
    }
  }, [href]);
  return (
    <Pressable onPress={handlePress}>
      <Text style={[styles.link, style]} {...rest} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    color: 'mediumblue',
    textDecorationLine: 'underline',
  },
});
