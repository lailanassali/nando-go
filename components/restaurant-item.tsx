import { Restaurant } from "@/types/restaurant";
import { getAddress } from "@/utils/get-address";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Card, List, Text } from "react-native-paper";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantItem({ restaurant }: Props) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({
      pathname: "/screens/nandos-webview-screen",
      params: {
        url: restaurant.url,
        title: restaurant.name,
      },
    });
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={{ color: "#eee" }}
        style={({ pressed }) => [
          styles.pressable,
          pressed && {
            elevation: pressed ? 6 : 2,
          },
        ]}
        testID="restaurant-item"
      >
        <Card mode="contained" style={styles.card}>
          <List.Item
            titleStyle={styles.listTitle}
            title={restaurant.name}
            description={() => (
              <Text numberOfLines={undefined}>
                {getAddress(restaurant.geo.address)}
              </Text>
            )}
            left={(props) => (
              <List.Image
                {...props}
                style={styles.logo}
                source={require("@/assets/images/nandos-logo.png")}
              />
            )}
          />
        </Card>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    margin: 5,
    padding: 10,
  },
  listTitle: {
    color: "#8B0000",
    fontWeight: 500,
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
  },
  pressable: {
    paddingVertical: 5,
  },
});
