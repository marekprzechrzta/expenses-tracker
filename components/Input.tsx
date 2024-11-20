import { TextInput, View, StyleSheet, KeyboardTypeOptions } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { color, shadow, size } from "@/constants/theme";
import Label from "./Label";
import styles from "@/constants/styles";

export default function Input({
  text,
  label,
  onChangeText,
  onPress,
  placeholder,
  keyboardType,
  icon,
  editable,
}: {
  text: string;
  label?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: "search";
  editable?: boolean;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <View style={styles.containerPadding}>
      {label && <Label label={label} />}
      <View
        style={{
          ...style.textInput,
          ...(selected && shadow.small),
        }}
      >
        <TextInput
          editable={editable === undefined ? true : editable}
          style={{ width: "90%" }}
          value={text}
          onPress={onPress}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType || "default"}
          //onFocus={() => setSelected(true)}
          //onBlur={() => setSelected(false)}
        />
        {icon && (
          <MaterialCommunityIcons
            name="magnify"
            size={size.large}
            color={color.gray2}
          />
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  textInput: {
    height: size.large * 2,
    backgroundColor: color.gray1,
    borderRadius: size.large * 2,
    paddingLeft: size.medium,
    paddingRight: size.small,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
