import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.search}>
          <Searchbar placeholder="Search" />
        </View>
        <View style={styles.list}>
          <Text>list</Text>
        </View>
      </SafeAreaView>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  search: {
    padding: 16,
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: 'blue',
  },
});
