import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "@/components/Header";
import Fab from "@/components/Fab";
import StackScreen from "@/components/StackScreen";
import styles from "@/constants/styles";
import { color, size } from "@/constants/theme";

export default function Empty() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Expenses tracker" />
      <View
        style={{
          ...styles.containerPadding,
          ...styles.center,
          height: "70%",
        }}
      >
        <Text style={style.title}>No expenses</Text>
        <Text style={style.subTitle}>Hit the + button to create one</Text>
      </View>
      <Fab onPress={() => router.push("/add")} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  title: { fontSize: size.large, color: color.gray2 },
  subTitle: { color: color.gray2 },
});
