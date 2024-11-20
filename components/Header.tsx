import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import images from "@/constants/images";
import { size, color, font } from "@/constants/theme";
import styles from "@/constants/styles";
import { useRouter } from "expo-router";

export default function Header({
  title,
  backArrow,
  settings,
}: {
  title: string;
  backArrow?: boolean;
  settings?: boolean;
}) {
  const router = useRouter();

  return (
    <View style={{ ...styles.container, alignItems: "center" }}>
      {backArrow ? (
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back-ios"
            size={size.medium * 2}
            color={color.primary}
          />
        </TouchableOpacity>
      ) : (
        <Logo />
      )}
      <Text style={style.title} onPress={() => router.push("/test")}>
        {title}
      </Text>
      {settings ? (
        <MaterialIcons
          name="settings"
          size={size.large * 2}
          color={color.gray2}
          onPress={() => router.push("/settings")}
        />
      ) : (
        <Logo />
      )}
    </View>
  );
}

const Logo = () => {
  return (
    <Image style={style.image} source={images.logo} resizeMode="contain" />
  );
};

const style = StyleSheet.create({
  image: {
    width: size.medium * 4,
    height: size.medium * 4,
  },
  title: {
    fontSize: size.large,
    color: color.gray2,
    fontFamily: font.regular,
  },
});
