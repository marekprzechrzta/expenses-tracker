import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import styles from "@/constants/styles";
import { color, size } from "@/constants/theme";
import { isNumber } from "@/helpers/isNumber";
import { parseNumber } from "@/helpers/parseNumber";
import { createExpense } from "@/api/expensesApi";
import useFunction from "@/hooks/useFunction";
import StackScreen from "@/components/StackScreen";

const categories = ["Food", "Alcohol", "Clothes", "Commute", "House", "Other"];

export default function Add() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", amount: "", category: "" });
  const { call, loading } = useFunction();

  const handleCreateExpense = async () => {
    const error = getValidationError();
    if (error) {
      Alert.alert(error);
      return;
    }

    await call(() =>
      createExpense({
        name: form.name,
        amount: parseNumber(form.amount),
        category: form.category,
        date: new Date().toISOString(),
      })
    );

    router.replace("/");
  };

  const getValidationError = () => {
    if (!form.name) {
      return "Expense name is required";
    }
    if (!form.amount) {
      return "Amount is required";
    }
    if (!isNumber(form.amount)) {
      return "Amount must be number";
    }
    if (!form.category) {
      return "Select category";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Create an expense" backArrow={true} />
      <Input
        text={form.name}
        onChangeText={(name) => setForm({ ...form, name })}
        placeholder="ie. Bear"
        label="Expense name"
      />
      <Input
        text={form.amount}
        onChangeText={(amount) => setForm({ ...form, amount })}
        placeholder="50"
        label="Amount"
        keyboardType="numeric"
      />
      <Select
        items={categories}
        selected={form.category}
        onPress={(category) => setForm({ ...form, category })}
      />
      <View style={{ ...styles.containerPadding, marginTop: size.large }}>
        <Button
          label={"Add"}
          onPress={handleCreateExpense}
          backgroundColor={color.primary}
          fontColor={color.white}
        />
      </View>
    </SafeAreaView>
  );
}
