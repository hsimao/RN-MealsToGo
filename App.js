import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";

const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;

export default function App() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: statusBarHeight,
        }}
      >
        <View style={{ padding: 16, backgroundColor: "green" }}>
          <Text>search</Text>
        </View>
        <View style={{ flex: 1, padding: 16, backgroundColor: "blue" }}>
          <Text>list</Text>
        </View>
      </SafeAreaView>
      <ExpoStatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({});
