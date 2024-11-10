import { render } from "@testing-library/react-native";

import Button from "@/components/Button";

describe("<Button />", () => {
  test("Label renders correctly", () => {
    const label = "label";
    const onPress = () => {};

    const { getByText } = render(<Button label={label} onPress={onPress} />);

    getByText(label);
  });
});
