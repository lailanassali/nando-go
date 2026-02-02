import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import RestaurantsList from "@/components/restaurantsList";
import { APP_VERSION, HEADER_HEIGHT } from "@/constants";
import { useRestaurants } from "@/hooks/use-restaurants";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  const { restaurants } = useRestaurants();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/header-image.png")}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Nandos{"\n"}Restaurants</Text>
          <Text style={styles.appVersion}>App version: {APP_VERSION}</Text>
        </View>
      </View>
      <RestaurantsList restaurants={restaurants} />
    </View>
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
});
