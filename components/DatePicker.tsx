import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import Label from "@/components/Label";
import styles from "@/constants/styles";
import { color, size } from "@/constants/theme";
import { formatDate } from "@/helpers/formatDate";
import { getLocales } from "expo-localization";

const locale = getLocales()[0];

export const DatePicker = ({
  value,
  label,
  onChange,
}: {
  value: Date;
  label?: string;
  onChange: (date: Date) => void;
}) => {
  const [date, setDate] = useState(value);
  const [show, setShow] = useState(false);

  const onHandleChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    onChange(selectedDate);
  };

  const showDatepicker = () => {
    setShow((prev) => !prev);
  };

  return (
    <View style={styles.containerPadding}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <Text style={style.input} onPress={showDatepicker}>
          {formatDate(date)}
        </Text>
      </View>
      {show && (
        <View style={style.datePickerContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="inline"
            onChange={onHandleChange}
            locale={locale.languageTag}
          />
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    color: color.gray2,
  },
  inputContainer: {
    backgroundColor: color.gray1,
    height: size.large * 2,
    borderRadius: size.large,
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    paddingLeft: size.medium,
  },
  datePickerContainer: {
    display: "flex",
    alignItems: "center",
  },
});
