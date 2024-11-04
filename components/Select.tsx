import { StyleSheet, View } from "react-native";

import Label from "./Label";
import Button from "./Button";
import styles from "@/constants/styles";
import { size } from "@/constants/theme";
import { toCategoryColor } from "@/helpers/toCategoryColor";

export default function Select({
  items,
  selected,
  onPress,
}: {
  items: string[];
  selected: string;
  onPress: (item: string) => void;
}) {
  return (
    <View style={{ ...styles.containerPadding }}>
      <Label label="Select category" />
      <View style={style.container}>
        {items.map((item) => (
          <Button
            key={item}
            label={item}
            selected={selected === item}
            onPress={onPress}
            backgroundColor={toCategoryColor(item)}
          />
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    columnGap: size.small / 2,
    rowGap: size.small / 2,
  },
});
