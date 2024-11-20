import { StyleSheet, View } from "react-native";

import Label from "./Label";
import Button from "./Button";
import styles from "@/constants/styles";
import { size } from "@/constants/theme";
import { toCategoryColor } from "@/helpers/toCategoryColor";
import { useT } from "@/translations/_i18t";

export default function Select({
  items,
  selected,
  onPress,
  buttonIcon,
  label,
  loading,
}: {
  items: { value: string; label: string }[];
  selected: string;
  onPress: (item: string) => void;
  buttonIcon?: string;
  label?: string;
  loading?: boolean;
}) {
  const { t } = useT();

  return (
    <View style={{ ...styles.containerPadding }}>
      <Label label={label || t("select_category")} />
      <View style={style.container}>
        {items.map((item) => (
          <Button
            key={item.value}
            label={item.label}
            selected={selected === item.value}
            onPress={() => onPress(item.value)}
            backgroundColor={toCategoryColor(item.value)}
            icon={buttonIcon}
            loading={loading}
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
