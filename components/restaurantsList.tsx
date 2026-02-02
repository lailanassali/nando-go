import { Restaurant } from "@/types/restaurant";
import { FlatList, StyleSheet } from "react-native";
import RestaurantItem from "./restaurantItem";

type Props = {
  restaurants: Restaurant[];
};

export default function RestaurantsList({ restaurants }: Props) {
  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantItem restaurant={item} />
  );

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
});
