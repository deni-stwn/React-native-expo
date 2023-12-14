import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TabItems from "../itemTab";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItems
            key={index}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
            options={options}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}

export default MyTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 18,
    paddingHorizontal: 55,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
