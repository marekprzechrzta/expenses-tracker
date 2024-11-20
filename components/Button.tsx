import {
  TouchableOpacity,
  Text,
  StyleSheet,
  DimensionValue,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import styles from "@/constants/styles";
import { color, font, size } from "@/constants/theme";

export default function Button({
  label,
  onPress,
  selected,
  fontColor,
  backgroundColor,
  width,
  icon,
  loading,
}: {
  label: string;
  onPress: (label: string) => void;
  selected?: boolean;
  fontColor?: string;
  backgroundColor?: string;
  width?: DimensionValue;
  icon?: string;
  loading?: boolean;
}) {
  const createContainerStyle = () => ({
    ...style.button,
    ...styles.center,
    ...(backgroundColor && { backgroundColor }),
    ...(selected && style.selected),
    width,
  });

  const createTextStyle = () => ({
    ...style.text,
    ...(fontColor && { color: fontColor }),
  });

  return (
    <TouchableOpacity
      style={createContainerStyle()}
      onPress={() => onPress(label)}
    >
      <Text style={createTextStyle()}>{label}</Text>
      {loading && selected ? (
        <ActivityIndicator color={color.black} />
      ) : (
        icon && (
          <FontAwesome name={icon as any} size={size.large} color="black" />
        )
      )}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  selected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: color.primary,
  },
  button: {
    backgroundColor: "rgba(79, 55, 138, 0.23)",
    height: size.large * 2,
    borderRadius: size.large * 2,
    paddingLeft: size.small,
    paddingRight: size.small,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: size.small,
  },
  text: {
    color: color.black,
    fontSize: size.medium,
    fontFamily: font.regular,
  },
});
