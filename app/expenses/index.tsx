import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
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

export default function Expenses() {
  const { timePeriod, date } = useLocalSearchParams<SearchParams>();
  const getAll = useCallback(getAllExpenses, []);
  const find = useCallback(() => findExpenses(timePeriod, date), []);
  const { data: expenses, call } = useFunction<Expense[]>(
    timePeriod ? find : getAll
  );
  const title = timePeriod ? toDateLongText(timePeriod, date) : "Recent";
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);
    call(() => searchByName(text, timePeriod, date));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Expenses" backArrow={true} />
      <Input
        text={search}
        placeholder="Search by name or category"
        onChangeText={handleSearch}
        icon="search"
      />
      <ScrollView>
        <Table title={title} expenses={expenses || []} />
      </ScrollView>
    </SafeAreaView>
  );
}

type SearchParams = {
  timePeriod: string;
  date: string;
};
