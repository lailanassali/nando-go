import { Image } from "expo-image";
import { FlatList, StyleSheet, View } from "react-native";

import { APP_VERSION, getAddress } from "@/constants";
import { useRestaurants } from "@/hooks/use-restaurants";
import { Card, List, Text } from "react-native-paper";

const HEADER_HEIGHT = 250;

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
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.cardContainer}
        renderItem={({ item }) => (
          <Card mode="contained" style={styles.card}>
            <List.Item
              titleStyle={styles.listTitle}
              title={item.name}
              description={() => (
                <Text numberOfLines={undefined}>
                  {getAddress(item.geo.address)}
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
        )}
      />
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
});
