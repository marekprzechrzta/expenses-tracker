import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { color, shadow, size } from "@/constants/theme";
import styles from "@/constants/styles";

export default function Fab({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={{ ...style.container, ...styles.center }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="plus"
        size={size.medium * 2}
        color={color.white}
      />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: color.primary,
    width: size.medium * 4,
    height: size.medium * 4,
    bottom: size.small * 2,
    right: size.small * 2,
    borderRadius: size.medium * 2,
    ...shadow.medium,
  },
});
