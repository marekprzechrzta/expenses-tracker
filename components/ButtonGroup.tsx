import { StyleProp, View, ViewStyle } from "react-native";

import Button from "./Button";
import styles from "@/constants/styles";
import { size } from "@/constants/theme";

export default function ButtonGroup({
  items,
  selected,
  onPress,
}: {
  items: { value: string; label: string }[];
  selected: string;
  onPress: (value: string) => void;
}) {
  const createContainerStyle = (): StyleProp<ViewStyle> => ({
    ...styles.container,
    justifyContent: "center",
    columnGap: size.small,
  });

  return (
    <View style={createContainerStyle()}>
      {items.map((item) => (
        <Button
          key={item.value}
          selected={selected === item.value}
          label={item.label}
          onPress={() => onPress(item.value)}
        />
      ))}
    </View>
  );
}
