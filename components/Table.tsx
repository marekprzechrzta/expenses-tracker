import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "@/constants/styles";
import { color, font, shadow, size } from "@/constants/theme";
import { Expense } from "@/models/Expense";
import { formatDate } from "@/helpers/formatDate";
import { formatPrice } from "@/helpers/formatPrice";
import { useT } from "@/translations/_i18t";

export default function Table({
  title,
  expenses,
  onPress,
  onRowPress,
  loading,
}: {
  title?: string;
  expenses: Expense[];
  onPress?: () => void;
  onRowPress?: (expense: Expense) => void;
  loading?: boolean;
}) {
  return (
    <View style={styles.containerPadding}>
      {title && (
        <TouchableOpacity
          style={style.title}
          onPress={onPress}
          disabled={!onPress}
        >
          <Text style={style.titleText}>{title}</Text>
          {loading && <ActivityIndicator size="small" color={color.primary} />}
        </TouchableOpacity>
      )}
      <View>
        {expenses.map((expense) => (
          <Row key={expense.id} expense={expense} onRowPress={onRowPress} />
        ))}
      </View>
    </View>
  );
}

const Row = ({
  expense,
  onRowPress,
}: {
  expense: Expense;
  onRowPress?: (expense: Expense) => void;
}) => {
  const { t } = useT();

  return (
    <TouchableOpacity
      style={style.row}
      onPress={() => onRowPress && onRowPress(expense)}
      disabled={!onRowPress}
    >
      <Cell label={expense.name} width="35%" />
      <Cell label={formatPrice(expense.amount)} width="20%" />
      <Cell label={t(expense.category)} width="20%" />
      <Cell label={formatDate(expense.date)} textAlign="right" width="25%" />
    </TouchableOpacity>
  );
};

const Cell = ({
  label,
  textAlign,
  width,
}: {
  label: string | number;
  width: DimensionValue;
  textAlign?: "left" | "right";
}) => {
  return (
    <Text
      numberOfLines={1}
      style={{
        ...style.cell,
        ...(textAlign && { textAlign }),
        ...(textAlign === "right"
          ? { paddingLeft: size.small / 2 }
          : { paddingRight: size.small / 2 }),
        width,
      }}
    >
      {label}
    </Text>
  );
};

const style = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: size.small,
    marginBottom: size.small,
    height: size.large,
  },
  titleText: {
    borderRadius: size.small,
    paddingLeft: size.small / 2,
    paddingRight: size.small / 2,
    backgroundColor: color.secondary,
    fontSize: size.medium,
    fontFamily: font.bold,
    color: color.black,
    ...shadow.small,
  },
  row: {
    ...styles.containerLayout,
    paddingTop: size.medium / 2,
    paddingBottom: size.medium / 2,
  },
  cell: {
    fontFamily: font.regular,
    color: color.gray2,
    fontSize: size.medium,
    textAlign: "left",
  },
});
