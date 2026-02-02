import { Restaurant } from "@/types/restaurant";
import { StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import RestaurantItem from "./restaurant-item";

type Props = {
  restaurants: Restaurant[];
};

export default function RestaurantsList({ restaurants }: Props) {
  const renderItem = ({ item }: { item: Restaurant; index: number }) => {
    return (
      <Animated.View entering={FadeInUp.duration(400)}>
        <RestaurantItem restaurant={item} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={restaurants}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
});
