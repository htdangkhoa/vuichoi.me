import { StyleSheet } from "react-native";

export default StyleSheet.create({
  placeContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    flex: 1,
    padding: 8
  },
  icon: {
    width: 30,
    marginRight: 8
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    padding: 8
  },
  textInput: {
    flex: 1,
    fontSize: 16
  },
  btnNext: {
    borderRadius: 8,
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16
  }
});
