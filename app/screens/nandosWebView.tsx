import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function NandosWebView() {
  const params = useLocalSearchParams();
  const url = params.url as string;
  const title = params.title as string;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title || "Nandos Restaurant",
    });
  });

  if (!url) {
    return <View style={styles.container} />;
  }

  return <WebView source={{ uri: url }} style={styles.container} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
