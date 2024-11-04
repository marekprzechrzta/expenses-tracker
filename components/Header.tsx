import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import images from "@/constants/images";
import { size, color, font } from "@/constants/theme";
import styles from "@/constants/styles";
import { useRouter } from "expo-router";

export default function Header({
  title,
  backArrow,
}: {
  title: string;
  backArrow?: boolean;
}) {
  const router = useRouter();

  return (
    <View style={{ ...styles.container, alignItems: "center" }}>
      {backArrow && (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={size.medium * 2}
            color={color.primary}
          />
        </TouchableOpacity>
      )}
      <Text style={style.title} onPress={() => router.push("/test")}>
        {title}
      </Text>
      <Image source={images.logo} />
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: size.large,
    color: color.gray2,
    fontFamily: font.regular,
  },
});
