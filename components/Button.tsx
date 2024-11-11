import {
  TouchableOpacity,
  Text,
  StyleSheet,
  DimensionValue,
} from "react-native";

import styles from "@/constants/styles";
import { color, font, size } from "@/constants/theme";

export default function Button({
  label,
  onPress,
  selected,
  fontColor,
  backgroundColor,
  width,
}: {
  label: string;
  onPress: (label: string) => void;
  selected?: boolean;
  fontColor?: string;
  backgroundColor?: string;
  width?: DimensionValue;
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
    paddingLeft: size.medium,
    paddingRight: size.medium,
  },
  text: {
    color: color.black,
    fontSize: size.medium,
    fontFamily: font.regular,
  },
});
