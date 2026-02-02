import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [shakeAnim] = useState(new Animated.Value(0));
  const [logoScale] = useState(new Animated.Value(1));
  const [logoOpacity] = useState(new Animated.Value(1));
  const [contentFade] = useState(new Animated.Value(0));
  const [splashFade] = useState(new Animated.Value(1)); // ⭐ fade out whole splash

  const [fontsLoaded] = useFonts({
    "Nandos-Regular": require("../assets/fonts/Nandos-Regular.ttf"),
  });

  const onReady = useCallback(async () => {
    if (!fontsLoaded) return;

    Animated.sequence([
      // SHAKE
      Animated.timing(shakeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      // GROW + FADE LOGO
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1.6,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      // FADE OUT SPLASH BACKGROUND
      Animated.timing(splashFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),

      // FADE IN APP
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded) return null;

  const shake = shakeAnim.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -10, 10, -10, 0],
  });

  return (
    <>
      {/* Splash Layer */}
      <Animated.View style={[styles.splashContainer, { opacity: splashFade }]}>
        <Animated.Image
          source={require("../assets/images/nandos-logo.png")}
          style={{
            width: 200,
            height: 200,
            opacity: logoOpacity,
            transform: [{ translateX: shake }, { scale: logoScale }],
          }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* App Content */}
      <Animated.View style={{ flex: 1, opacity: contentFade }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
