import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import styles from "@/constants/styles";
import { color, font, size } from "@/constants/theme";
import { toCategoryColor } from "@/helpers/toCategoryColor";
import { CategoryExpense } from "@/models/CategoryExpense";

export default function CategoryExpenses({
  totalAmount,
  expenses,
  onPress,
}: {
  totalAmount: number;
  expenses: CategoryExpense[];
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={{ ...styles.containerPadding }} onPress={onPress}>
      <Header totalAmount={totalAmount} />
      {expenses.map((expense) => (
        <Row key={expense.category} expense={expense} />
      ))}
    </TouchableOpacity>
  );
}

const Header = ({ totalAmount }: { totalAmount: number }) => {
  return (
    <View style={{ ...styles.containerLayout }}>
      <Text style={style.headerText}>Total amount</Text>
      <Text style={style.headerText}>${totalAmount}</Text>
    </View>
  );
};

const Row = ({ expense }: { expense: CategoryExpense }) => {
  return (
    <View style={{ ...styles.containerLayout }}>
      <View style={style.rowTextContainer}>
        <View
          style={{
            ...style.colorIndicator,
            backgroundColor: toCategoryColor(expense.category),
          }}
        />
        <Text style={style.rowText}>{expense.category}</Text>
      </View>
      <Text style={style.rowText}>${expense.totalAmount}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  headerText: {
    fontFamily: font.bold,
    fontSize: size.medium,
    paddingBottom: size.large / 2,
  },
  rowTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: size.small,
    paddingBottom: size.large / 2,
  },
  rowText: {
    color: color.gray2,
  },
  colorIndicator: {
    width: size.small,
    height: size.small,
    backgroundColor: color.purple,
  },
});
