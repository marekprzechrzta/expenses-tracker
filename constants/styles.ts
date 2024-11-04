import { StyleSheet } from "react-native";
import { color, size } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.white,
  },
  container: {
    paddingLeft: size.small * 2,
    paddingRight: size.small * 2,
    paddingTop: size.small,
    paddingBottom: size.small,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  containerPadding: {
    paddingLeft: size.small * 2,
    paddingRight: size.small * 2,
    paddingTop: size.small,
    paddingBottom: size.small,
  },
  containerLayout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
