import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { findExpenses, getAllExpenses, searchByName } from "@/api/expensesApi";
import Table from "@/components/Table";
import useFunction from "@/hooks/useFunction";
import StackScreen from "@/components/StackScreen";
import Header from "@/components/Header";
import styles from "@/constants/styles";
import { Expense } from "@/models/Expense";
import { toDateLongText } from "@/helpers/toDateLongText";
import Input from "@/components/Input";
import { useT } from "@/translations/_i18t";

export default function Expenses() {
  const router = useRouter();
  const { timePeriod, date } = useLocalSearchParams<SearchParams>();
  const getAll = useCallback(getAllExpenses, []);
  const find = useCallback(() => findExpenses(timePeriod, date), []);
  const expenses = useFunction<Expense[]>(timePeriod ? find : getAll);
  const [search, setSearch] = useState("");
  const { t } = useT();
  const tableTitle = timePeriod
    ? toDateLongText(timePeriod, date)
    : t("expenses");
  const title = timePeriod ? t("expenses_by_category") : t("all_expenses");

  const handleSearch = (text: string) => {
    setSearch(text);
    expenses.call(() => searchByName(text, timePeriod, date));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title={title} backArrow={true} />
      <Input
        text={search}
        placeholder={t("search_by_name_or_category")}
        onChangeText={handleSearch}
        icon="search"
      />
      <ScrollView>
        <Table
          title={tableTitle}
          expenses={expenses.data || []}
          loading={expenses.loading}
          onRowPress={(expense) => router.push(`/edit?expenseId=${expense.id}`)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

type SearchParams = {
  timePeriod: string;
  date: string;
};
