import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FloatingAddButton({ onPress }: any) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                position: "absolute",
                bottom: 30,
                right: 20,

                width: 60,
                height: 60,
                borderRadius: 30,

                backgroundColor: "#4CAF50",

                justifyContent: "center",
                alignItems: "center",

                elevation: 6,
            }}
        >
            <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
    );
}
