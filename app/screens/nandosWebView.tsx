import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NandosWebView() {
  const params = useLocalSearchParams();
  const url = params.url as string;
  const title = params.title as string;

  if (!url) {
    return <View style={styles.container} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: title || "Nandos Restaurant",
          headerBackTitle: "Back",
        }}
      />
      <WebView source={{ uri: url }} style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
