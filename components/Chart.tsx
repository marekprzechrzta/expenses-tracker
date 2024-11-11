import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect, useState } from "react";

import styles from "@/constants/styles";
import { color, font, size } from "@/constants/theme";
import { toCategoryColor } from "@/helpers/toCategoryColor";
import { toDateLongText as toDateLongText } from "@/helpers/toDateLongText";
import { toDateShortText } from "@/helpers/toDateShortText";
import { CategoryExpense } from "@/models/CategoryExpense";
import { TimePeriodExpense } from "@/models/TimePeriodExpense";
import { calculateScale } from "@/helpers/calculateScale";

export function Chart({
  expenses,
  onBarPress,
  loading,
}: {
  expenses: TimePeriodExpense[];
  onBarPress: (expense: TimePeriodExpense) => void;
  loading?: boolean;
}) {
  const initialBarIdx = expenses.length - 1;
  const [selectedBarIdx, setSelectedBarIdx] = useState(initialBarIdx);

  useEffect(() => {
    setSelectedBarIdx(initialBarIdx);
    onBarPress(expenses[initialBarIdx]);
  }, [expenses]);

  const selectedExpenses = expenses[selectedBarIdx];
  const selectedDate = selectedExpenses?.date;
  const selectedTimePeriod = selectedExpenses?.timePeriod;

  const handleBarPress = (barIdx: number) => {
    setSelectedBarIdx(barIdx);
    onBarPress(expenses[barIdx]);
  };

  return (
    <View style={styles.containerPadding}>
      <View style={style.titleContainer}>
        <Text style={style.titleText}>
          {toDateLongText(selectedTimePeriod, selectedDate)}
        </Text>
        {loading && <ActivityIndicator size="small" color={color.primary} />}
      </View>
      <View>
        <Grid />
        <Bars
          expenses={expenses}
          selected={selectedBarIdx}
          onPress={handleBarPress}
        />
        <Labels
          labels={expenses.map((e) => toDateShortText(e.timePeriod, e.date))}
          selected={selectedBarIdx}
        />
      </View>
    </View>
  );
}

const Grid = () => {
  return (
    <View
      style={{
        ...style.containerSize,
        ...style.linesContainer,
        position: "absolute",
      }}
    >
      <View style={{ ...style.line }} />
      <View style={{ ...style.line }} />
      <View style={{ ...style.line }} />
      <View style={{ ...style.line }} />
      <View style={{ ...style.line }} />
    </View>
  );
};

const Bars = ({
  expenses,
  selected,
  onPress,
}: {
  expenses: TimePeriodExpense[];
  selected: number;
  onPress: (item: number) => void;
}) => {
  const scale = calculateScale(expenses, chartHeight);

  return (
    <View style={{ ...style.containerSize, ...style.barsContainer }}>
      {expenses.map((e, i) => (
        <Bar
          key={i}
          id={i}
          scale={scale}
          categories={e.categoryExpenses}
          selected={selected}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

const Labels = ({
  labels,
  selected,
}: {
  labels: string[];
  selected: number;
}) => {
  const createTextStyle = (i: number) => ({
    ...style.label,
    ...(selected === i && style.selectedLabel),
  });

  return (
    <View style={style.barsContainer}>
      {labels.map((label, i) => (
        <View key={i} style={style.labelContainer}>
          <Text style={createTextStyle(i)}>{label}</Text>
        </View>
      ))}
    </View>
  );
};

const Bar = ({
  id,
  categories,
  selected,
  scale,
  onPress,
}: {
  id: number;
  categories: CategoryExpense[];
  selected: number;
  scale: number;
  onPress: (id: number) => void;
}) => {
  const isSelected = selected === id;

  const createCategoryStyle = (c: CategoryExpense) => ({
    ...style.bar,
    backgroundColor: toCategoryColor(c.category),
    height: c.totalAmount * scale,
  });

  const createBarStyle = () => ({
    ...style.barContainer,
    ...(isSelected && style.selectedBar),
  });

  return (
    <TouchableOpacity style={createBarStyle()} onPress={() => onPress(id)}>
      {categories.map((category, i) => (
        <View key={i} style={createCategoryStyle(category)} />
      ))}
      {isSelected && <ArrowDown />}
    </TouchableOpacity>
  );
};

const ArrowDown = () => {
  return <Entypo name="triangle-down" size={size.large} color={color.black} />;
};

const chartHeight = 200;

const style = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: size.small,
    height: size.large,
    marginBottom: size.small,
  },
  titleText: {
    fontFamily: font.bold,
  },
  containerSize: {
    width: "100%",
    height: chartHeight,
  },
  barsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  linesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: chartHeight,
  },
  line: {
    borderBottomWidth: 1,
    borderBlockColor: color.gray1,
    borderStyle: "solid",
  },
  barContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    opacity: 0.5,
    width: size.large * 2,
    alignItems: "center",
    paddingLeft: size.small,
    paddingRight: size.small,
  },
  bar: {
    width: size.small,
    backgroundColor: color.blue,
    borderRadius: size.small / 2,
  },
  selectedBar: {
    opacity: 1,
  },
  labelContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: size.large * 2,
  },
  label: {
    paddingTop: size.small / 2,
    color: color.gray2,
  },
  selectedLabel: {
    fontFamily: font.bold,
    color: color.black,
  },
});
