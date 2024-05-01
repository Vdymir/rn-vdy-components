/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  type TextInputProps,
} from 'react-native';

interface InputProps extends TextInputProps {}

export function Input({ style, value, ...rest }: InputProps) {
  const position = useRef(new Animated.Value(0)).current;
  const [hasFocus, setHasFocus] = useState(false);

  const positionAnimation = (v: number) =>
    Animated.timing(position, {
      toValue: v,
      duration: 200,
      useNativeDriver: true,
    });

  const onFocusAction = () => {
    setHasFocus(true);
    positionAnimation(-14).start();
  };
  const onBlurAction = () => {
    if (value) {
      setHasFocus(false);
      positionAnimation(0).start();
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color: hasFocus ? '#3e3e3e' : '#e7e5df',
              fontSize: hasFocus ? 10 : 14,
              transform: [{ translateY: position }],
            },
          ]}
        >
          Placeholder
        </Animated.Text>
        <TextInput
          style={[styles.input, style]}
          onFocus={onFocusAction}
          onBlur={onBlurAction}
          {...rest}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#D3D0CB',
    borderRadius: 4,
    padding: 8,
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    top: '50%',
    left: '2.5%',

    backgroundColor: '#FFFFFF',
    paddingHorizontal: 5,
  },
  input: {},
});
