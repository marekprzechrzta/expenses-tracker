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
    <View style={styles.containerPadding}>
      <Header totalAmount={totalAmount} onPress={onPress} />
      {expenses.map((expense) => (
        <Row key={expense.category} expense={expense} />
      ))}
    </View>
  );
}

const Header = ({
  totalAmount,
  onPress,
}: {
  totalAmount: number;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.containerLayout }}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={style.headerText}>Total amount</Text>
      <Text style={style.headerText}>${totalAmount}</Text>
    </TouchableOpacity>
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
