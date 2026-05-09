import { View, Text } from "react-native";

export default function Settings() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Todo Screen
            </Text>

            <Text style={{ marginTop: 10, color: "gray" }}>
                Coming soon...
            </Text>
        </View>
    );
}
