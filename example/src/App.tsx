import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Divider, Link, Typography } from 'rn-vdy-components';

export default function App() {
  return (
    <View style={styles.container}>
      <Typography fontSize={20} fontWeight="bold">
        hola
      </Typography>
      <Divider />
      <Link hrefs="www.google.com">Esto es un link</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    flexDirection: 'row',
  },
});
