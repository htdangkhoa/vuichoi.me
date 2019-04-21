import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bottomSheet: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  bottomSheetContainer: {
    flexDirection: "column",
    backgroundColor: "#F8F8F8"
  },
  bottomSheetAction: { height: 30 },
  bottomSheetActionIcon: { color: "black" },
  bottomSheetContentContainer: { padding: 8 },
  btnAddStopPoints: { borderRadius: 8, margin: 8 }
});
