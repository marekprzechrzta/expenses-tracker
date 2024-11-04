import { StyleProp, View, ViewStyle } from "react-native";

import Button from "./Button";
import styles from "@/constants/styles";
import { size } from "@/constants/theme";

export default function ButtonGroup({
  labels,
  selected,
  onPress,
}: {
  labels: string[];
  selected: string;
  onPress: (label: string) => void;
}) {
  const createContainerStyle = (): StyleProp<ViewStyle> => ({
    ...styles.container,
    justifyContent: "center",
    columnGap: size.small,
  });

  return (
    <View style={createContainerStyle()}>
      {labels.map((item) => (
        <Button
          key={item}
          selected={selected === item}
          label={item}
          onPress={onPress}
        />
      ))}
    </View>
  );
}
