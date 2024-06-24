import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
    gap: 16,
  },
  cardImage: {
    width: 95,
    height: 120,
    borderRadius: 15,
  },
  info: {
    justifyContent: "space-around"
  },
  infoText: {
    fontSize: 16,
    color: "#fff",
  },
  containerInfo: {
    flexDirection: "column",
    gap: 4,
  },
  infoDetails: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center"
  },
  infoDetailsText: {
    color: "#fff",
    fontSize: 12
  },
  infoDetailsText1: {
    marginRight: 10,
    color: "#FF8700",
    fontSize: 12,
  },
})