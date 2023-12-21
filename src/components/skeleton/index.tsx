import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';

export type AnimateValue =
  | number
  | Animated.Value
  | 'auto'
  | `${number}%`
  | Animated.AnimatedInterpolation<string | number>
  | Animated.WithAnimatedObject<Animated.AnimatedNode>
  | null
  | undefined;

export interface SkeletonProps {
  width: AnimateValue;
  height: AnimateValue;
  radius?: number;
  isCircle?: boolean;
}

export function Skeleton({
  height,
  width,
  isCircle = false,
  radius = 0,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 500,
        }),
      ])
    ).start();
    return () => {
      opacity.stopAnimation();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity,
          height,
          width,
          borderRadius: isCircle ? Number(width) / 2 : radius,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'grey',
  },
});
