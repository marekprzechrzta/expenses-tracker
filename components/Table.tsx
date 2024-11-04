import {
  View,
  Text,
  StyleSheet,
  DimensionValue,
  TouchableOpacity,
} from "react-native";

import styles from "@/constants/styles";
import { color, font, size } from "@/constants/theme";
import { Expense } from "@/models/Expense";
import { formatDate } from "@/helpers/formatDate";

export default function Table({
  title,
  expenses,
  onPress,
}: {
  title: string;
  expenses: Expense[];
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.containerPadding} onPress={onPress}>
      <View>
        <Text style={style.title}>{title}</Text>
      </View>
      <View>
        {expenses.map((expense) => (
          <Row key={expense.id} expense={expense} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const Row = ({ expense }: { expense: Expense }) => {
  return (
    <View style={style.row}>
      <Cell label={expense.name} width="35%" />
      <Cell label={`$${expense.amount}`} width="15%" />
      <Cell label={expense.category} width="25%" />
      <Cell label={formatDate(expense.date)} textAlign="right" width="25%" />
    </View>
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
      style={{
        ...style.cell,
        ...(textAlign && { textAlign }),
        width,
      }}
    >
      {label}
    </Text>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: size.medium,
    fontFamily: font.bold,
    color: color.black,
    marginBottom: size.small,
  },
  row: {
    ...styles.containerLayout,
    paddingBottom: size.large / 2,
  },
  cell: {
    fontFamily: font.regular,
    color: color.gray2,
    fontSize: size.medium,
    textAlign: "left",
  },
});
