import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

type Fn<T> = () => Promise<T>;

export default function useFunction<T>(fn?: Fn<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const call = async (callFn?: Fn<T>) => {
    const f = callFn || fn;

    if (!f) return;

    setLoading(true);

    try {
      setData(await f());
    } catch (e) {
      const error = e as Error;
      setError(error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    call();
  }, [fn]);

  return { data, loading, error, call };
}
