import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import RestaurantsList from "@/components/restaurants-list";
import { APP_VERSION, HEADER_HEIGHT } from "@/constants";
import { useRestaurants } from "@/hooks/use-restaurants";
import { Text } from "react-native-paper";

export default function RestaurantScreen() {
  const { restaurants } = useRestaurants();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          contentFit="cover"
          source={require("@/assets/images/header-image.png")}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.headerTitle}>Nandos{"\n"}Restaurants</Text>
          <Text style={styles.appVersion}>App version: {APP_VERSION}</Text>
        </View>
      </View>
      {restaurants && restaurants.length > 0 ? (
        <RestaurantsList restaurants={restaurants} />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Sorry, we couldn’t load any restaurant locations at the moment.
          </Text>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#8B0000",
    fontWeight: "700",
  },
});
