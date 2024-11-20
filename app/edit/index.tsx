import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
import { useT } from "@/translations/_i18t";
import { getCategories } from "@/api/categoriesApi";
import { DatePicker } from "@/components/DatePicker";

export default function Add() {
  const router = useRouter();
  const { expenseId } = useLocalSearchParams<SearchParams>();
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date(),
  });
  const { call } = useFunction();
  const { t } = useT();
  const { data: categories } = useFunction(getCategories);

  useEffect(() => {
    const findExpense = async () => {
      const expense = await getExpense(expenseId);
      if (expense) {
        setForm({
          name: expense.name,
          amount: String(expense.amount),
          category: expense.category,
          date: new Date(expense.date),
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
        date: form.date.toISOString(),
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

  const onChange = (selectedDate: Date) => {
    setForm((prev) => ({ ...prev, date: selectedDate }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title={t("edit_an_expense")} backArrow={true} />
      <KeyboardAwareScrollView>
        <Input
          text={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
          placeholder={t("ie_beer")}
          label={t("expense_name")}
        />
        <Input
          text={form.amount}
          onChangeText={(amount) => setForm({ ...form, amount })}
          placeholder="50"
          label={t("amount")}
          keyboardType="numeric"
        />
        <Select
          items={categories || []}
          selected={form.category}
          onPress={(category) => setForm({ ...form, category })}
        />
        <DatePicker label={t("date")} value={form.date} onChange={onChange} />
        <View style={{ ...styles.containerPadding, ...style.actionsContainer }}>
          <Button
            label={t("delete")}
            onPress={handleDeleteExpense}
            backgroundColor="red"
            fontColor={color.white}
            width="45%"
          />
          <Button
            label={t("save")}
            onPress={handleUpdateExpense}
            backgroundColor={color.primary}
            fontColor={color.white}
            width="45%"
          />
        </View>
      </KeyboardAwareScrollView>
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
