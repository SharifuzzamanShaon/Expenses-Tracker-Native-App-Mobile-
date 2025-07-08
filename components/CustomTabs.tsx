import { colors } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text } from "@react-navigation/elements";
import * as Icons from "phosphor-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
``
export default function CustomTabs({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
const tabbarIcons: any = {
index: (useIsFocused: boolean) => (
    <Icons.House size={28} color={useIsFocused ? colors.primary : colors.text} />
),
profile: (useIsFocused: boolean) => (
    <Icons.User size={28} color={useIsFocused ? colors.primary : colors.text} />
),
wallet: (useIsFocused: boolean) => (
    <Icons.Wallet size={28} color={useIsFocused ? colors.primary : colors.text} />
),
statistics: (useIsFocused: boolean) => (
    <Icons.ChartBar size={28} color={useIsFocused ? colors.primary : colors.text} />
),

};

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
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
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              { tabbarIcons && tabbarIcons[route.name](isFocused)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: verticalScale(80),
    backgroundColor: colors.neutral800,
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarItem: {
    marginBottom: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
