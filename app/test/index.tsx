import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  clearDatabase,
  createRandomExpense,
  dropCategories,
  getCategories,
  seedCategories,
  seedDatabase,
} from "@/api/testApi";
import Button from "@/components/Button";
import Header from "@/components/Header";
import StackScreen from "@/components/StackScreen";
import styles from "@/constants/styles";
import { size } from "@/constants/theme";

export default function Test() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Test panel" backArrow={false} />
      <View style={{ ...styles.containerPadding, rowGap: size.small }}>
        <Button label="Seed database" onPress={seedDatabase} />
        <Button label="Create random expense" onPress={createRandomExpense} />
        <Button label="Clear database" onPress={clearDatabase} />
        <Button label="Drop categories" onPress={dropCategories} />
        <Button label="Seed categories" onPress={seedCategories} />
        <Button label="Get categories" onPress={getCategories} />
        <Button
          label="Back to home"
          onPress={() => {
            router.replace("/");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
