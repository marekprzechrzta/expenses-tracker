import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Select from "@/components/Select";
import styles from "@/constants/styles";
import { color, size } from "@/constants/theme";
import { isNumber } from "@/helpers/isNumber";
import { parseNumber } from "@/helpers/parseNumber";
import { deleteExpense, getExpense, updateExpense } from "@/api/expensesApi";
import useFunction from "@/hooks/useFunction";
import StackScreen from "@/components/StackScreen";

const categories = ["Food", "Alcohol", "Clothes", "Commute", "House", "Other"];

export default function Add() {
  const router = useRouter();
  const { expenseId } = useLocalSearchParams<SearchParams>();
  const [form, setForm] = useState({ name: "", amount: "", category: "" });
  const { call } = useFunction();

  useEffect(() => {
    const findExpense = async () => {
      const expense = await getExpense(expenseId);
      if (expense) {
        setForm({
          name: expense.name,
          amount: String(expense.amount),
          category: expense.category,
        });
      }
    };
    findExpense();
  }, [expenseId]);

  const handleUpdateExpense = async () => {
    const error = getValidationError();
    if (error) {
      Alert.alert(error);
      return;
    }

    await call(() =>
      updateExpense({
        id: expenseId,
        name: form.name,
        amount: parseNumber(form.amount),
        category: form.category,
        date: new Date().toISOString(),
      })
    );

    router.replace("/");
  };

  const handleDeleteExpense = async () => {
    await call(() => deleteExpense(expenseId));
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
      <Header title="Edit an expense" backArrow={true} />
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
      <View style={{ ...styles.containerPadding, ...style.actionsContainer }}>
        <Button
          label={"Delete"}
          onPress={handleDeleteExpense}
          backgroundColor="red"
          fontColor={color.white}
          width="45%"
        />
        <Button
          label={"Save"}
          onPress={handleUpdateExpense}
          backgroundColor={color.primary}
          fontColor={color.white}
          width="45%"
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  actionsContainer: {
    width: "100%",
    marginTop: size.large,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

type SearchParams = {
  expenseId: string;
};
