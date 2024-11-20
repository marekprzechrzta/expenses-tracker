import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import styles from "@/constants/styles";
import { color, size } from "@/constants/theme";
import useFunction from "@/hooks/useFunction";
import StackScreen from "@/components/StackScreen";
import { useT } from "@/translations/_i18t";
import Select from "@/components/Select";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/api/categoriesApi";

export default function Settings() {
  const [form, setForm] = useState({ category: "" });
  const { call, loading } = useFunction();
  const { t } = useT();
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    const error = getValidationError();
    if (error) {
      Alert.alert(error);
      return;
    }

    await call(() =>
      createCategory({
        value: form.category.toLowerCase(),
        label: form.category,
      })
    );

    setCategories((prev) => {
      const value = form.category.toLocaleLowerCase();
      if (prev.find((c) => c.value === value)) {
        Alert.alert("Category already exists");
        return prev;
      }

      setForm({ category: "" });
      return [...prev, { label: form.category, value }];
    });
  };

  const getValidationError = () => {
    if (!form.category) {
      return "Category is required";
    }
  };

  const handleDeleteCategory = async (category: string) => {
    setSelected(category);
    await call(() => deleteCategory(category.toLowerCase()));
    setCategories((prev) => prev.filter((c) => c.value !== category));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StackScreen />
      <Header title="Settings" backArrow={true} />
      <Input
        text={form.category}
        onChangeText={(category) => setForm({ ...form, category })}
        placeholder={t("ie_food")}
        label={t("category")}
      />
      <View style={{ ...styles.containerPadding }}>
        <Button
          label={t("add")}
          onPress={handleCreateCategory}
          backgroundColor={color.primary}
          fontColor={color.white}
        />
      </View>
      <Select
        label={t("categories")}
        items={categories}
        selected={selected}
        loading={loading}
        onPress={handleDeleteCategory}
        buttonIcon="trash-o"
      />
    </SafeAreaView>
  );
}
