import React from 'react';
import {
  Linking,
  Text,
  Pressable,
  StyleSheet,
  type TextProps,
} from 'react-native';

export interface LinkProps extends TextProps {
  hrefs: string;
}

export function Link({ hrefs, style, ...rest }: LinkProps) {
  const handlePress = React.useCallback(async () => {
    const supported = await Linking.canOpenURL(hrefs);
    if (supported) {
      await Linking.openURL(hrefs);
    } else {
      throw new Error(`Don't know how to open this URL: ${hrefs}`);
    }
  }, [hrefs]);
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
