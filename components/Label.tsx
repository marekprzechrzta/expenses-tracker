import { color, size } from "@/constants/theme";
import { Text, StyleSheet } from "react-native";

export default function Label({ label }: { label: string }) {
  return <Text style={style.label}>{label}</Text>;
}

const style = StyleSheet.create({
  label: {
    color: color.gray2,
    paddingBottom: size.small / 2,
  },
});
