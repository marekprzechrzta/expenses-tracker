import styles from "@/constants/styles";
import { color, font, shadow, size } from "@/constants/theme";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({
  label,
  onPress,
  selected,
  fontColor,
  backgroundColor,
}: {
  label: string;
  onPress: (label: string) => void;
  selected?: boolean;
  fontColor?: string;
  backgroundColor?: string;
}) {
  const createContainerStyle = () => ({
    ...style.button,
    ...styles.center,
    ...(backgroundColor && { backgroundColor }),
    ...(selected && style.selected),
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
    ...shadow.small,
  },
  text: {
    color: color.black,
    fontSize: size.medium,
    fontFamily: font.regular,
  },
});
