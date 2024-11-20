import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import styles from "@/constants/styles";
import { color, font, shadow, size } from "@/constants/theme";
import { toCategoryColor } from "@/helpers/toCategoryColor";
import { CategoryExpense } from "@/models/CategoryExpense";
import { formatPrice } from "@/helpers/formatPrice";
import { useT } from "@/translations/_i18t";

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
  const { t } = useT();

  return (
    <View style={{ ...styles.containerLayout }}>
      <TouchableOpacity onPress={onPress} disabled={!onPress}>
        <Text style={style.headerText}>{t("total_amount")}</Text>
      </TouchableOpacity>
      <Text style={style.headerAmount}>{formatPrice(totalAmount)}</Text>
    </View>
  );
};

const Row = ({ expense }: { expense: CategoryExpense }) => {
  const { t } = useT();

  return (
    <View style={{ ...styles.containerLayout }}>
      <View style={style.rowTextContainer}>
        <View
          style={{
            ...style.colorIndicator,
            backgroundColor: toCategoryColor(expense.category),
          }}
        />
        <Text style={style.rowText}>{t(expense.category)}</Text>
      </View>
      <Text style={style.rowText}>{formatPrice(expense.totalAmount)}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  headerText: {
    fontFamily: font.bold,
    fontSize: size.medium,
    marginBottom: size.large / 2,
    backgroundColor: color.secondary,
    paddingRight: size.small / 2,
    paddingLeft: size.small / 2,
    borderRadius: size.small,
    ...shadow.small,
  },
  headerAmount: {
    fontFamily: font.bold,
    fontSize: size.medium,
    paddingBottom: size.large / 2,
  },
  rowTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: size.small,
    paddingTop: size.medium / 2,
    paddingBottom: size.medium / 2,
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
