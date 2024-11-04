import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

import Header from "@/components/Header";
import ButtonGroup from "@/components/ButtonGroup";
import { Chart } from "@/components/Chart";
import Table from "@/components/Table";
import Fab from "@/components/Fab";
import StackScreen from "@/components/StackScreen";
import Empty from "@/components/Empty";
import CategoryExpenses from "@/components/CategoryExpenses";
import useFunction from "@/hooks/useFunction";
import { getRecentExpenses, getTimePeriodExpenses } from "@/api/expensesApi";
import styles from "@/constants/styles";
import { TimePeriodExpense } from "@/models/TimePeriodExpense";

export default function Home() {
  const router = useRouter();
  const { data: recentExpenses } = useFunction(getRecentExpenses);
  const { data: expenses, call } = useFunction(getTimePeriodExpenses);
  const [timePeriod, setTimePeriod] = useState("Daily");
  const [selectedExpenses, setSelectedExpenses] = useState<TimePeriodExpense>();

  const handleTimePeriodChange = async (timePeriod: string) => {
    await call(() => getTimePeriodExpenses(timePeriod));
    setTimePeriod(timePeriod);
  };

  const categoryExpensesQuery = `timePeriod=${timePeriod}&date=${selectedExpenses?.date}`;

  if (!expenses?.length) {
    return <Empty />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Expenses tracker" />
      <ScrollView>
        <ButtonGroup
          labels={["Daily", "Weekly", "Monthly", "Yearly"]}
          selected={timePeriod}
          onPress={handleTimePeriodChange}
        />
        <Chart expenses={expenses || []} onBarPress={setSelectedExpenses} />
        <CategoryExpenses
          totalAmount={selectedExpenses?.totalAmount || 0}
          expenses={selectedExpenses?.categoryExpenses || []}
          onPress={() => router.push(`/expenses?${categoryExpensesQuery}`)}
        />
        <Table
          title="Recent expenses"
          expenses={recentExpenses || []}
          onPress={() => router.push("/expenses")}
        />
      </ScrollView>
      <Fab onPress={() => router.push("/add")} />
    </SafeAreaView>
  );
}
