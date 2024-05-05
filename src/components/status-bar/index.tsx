import React from 'react';
import {
  SafeAreaView,
  StatusBar as StatusBarRN,
  View,
  StyleSheet,
  type StatusBarProps,
} from 'react-native';

export function StatusBar({ backgroundColor, ...props }: StatusBarProps) {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBarRN.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
