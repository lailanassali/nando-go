import { getAddress, HEADER_HEIGHT } from "@/constants";
import { Restaurant } from "@/types/restaurant";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { Card, List, Text } from "react-native-paper";

type Props = {
  restaurant: Restaurant;
};

export default function RestaurantItem({ restaurant }: Props) {
  const router = useRouter();
  const [elevation, setElevation] = useState(4); // For Android shadow
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({
      pathname: "/screens/nandosWebView",
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
    setElevation(8);
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setElevation(4);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Card mode="contained" style={styles.card}>
        <Pressable
          onPress={handlePress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          android_ripple={{ color: "#eee" }}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
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
        </Pressable>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: HEADER_HEIGHT,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  title: {
    fontFamily: "Nandos-Regular",
    fontSize: 21,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "Nandos-Regular",
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    paddingTop: 30,
  },
  appVersion: {
    color: "white",
    fontWeight: 600,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 20,
    margin: 10,
    padding: 10,
  },
  cardContainer: {
    marginTop: 10,
  },
  textContainer: {
    fontSize: 20,
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
  pressed: {
    borderRadius: 10,
  },
});
