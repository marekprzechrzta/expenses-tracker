import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
import { useT } from "@/translations/_i18t";

export default function Home() {
  const router = useRouter();
  const recentExpenses = useFunction(getRecentExpenses);
  const timePeriodExpenses = useFunction(getTimePeriodExpenses);
  const [timePeriod, setTimePeriod] = useState("Daily");
  const [selectedExpenses, setSelectedExpenses] = useState<TimePeriodExpense>();
  const { t } = useT();

  const loading = recentExpenses.loading || timePeriodExpenses.loading;
  const categoryExpensesQuery = `timePeriod=${timePeriod}&date=${selectedExpenses?.date}`;

  if (!timePeriodExpenses.data?.length && !loading) {
    return <Empty />;
  }

  const handleTimePeriodChange = async (timePeriod: string) => {
    setTimePeriod(timePeriod);
    await timePeriodExpenses.call(() => getTimePeriodExpenses(timePeriod));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title={t("expenses_tracker")} settings={true} />
      <ScrollView>
        <ButtonGroup
          items={[
            { value: "Daily", label: t("daily") },
            { value: "Weekly", label: t("weekly") },
            { value: "Monthly", label: t("monthly") },
            { value: "Yearly", label: t("yearly") },
          ]}
          selected={timePeriod}
          onPress={handleTimePeriodChange}
        />
        <Chart
          expenses={timePeriodExpenses.data || []}
          onBarPress={setSelectedExpenses}
          loading={timePeriodExpenses.loading}
        />
        <CategoryExpenses
          totalAmount={selectedExpenses?.totalAmount || 0}
          expenses={selectedExpenses?.categoryExpenses || []}
          onPress={() => router.push(`/expenses?${categoryExpensesQuery}`)}
        />
        <Table
          title={t("recent_expenses")}
          expenses={recentExpenses.data || []}
          loading={recentExpenses.loading}
          onPress={() => router.push("/expenses")}
          onRowPress={(expense) => router.push(`/edit?expenseId=${expense.id}`)}
        />
      </ScrollView>
      <Fab onPress={() => router.push("/add")} />
    </SafeAreaView>
  );
}
