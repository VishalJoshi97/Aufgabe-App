import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "HIGH":
            return "#ff4d4d";
        case "MEDIUM":
            return "#ffb84d";
        case "LOW":
            return "#4CAF50";
        default:
            return "#aaa";
    }
};

export default function TodoItem({ item, onToggle, onDelete }: any) {
    const isOverdue = item.dueDate && new Date(item.dueDate) < new Date();
    return (
        <View
            style={{
                backgroundColor: "#1e1e1e",
                padding: 14,
                borderRadius: 12,
                marginBottom: 10,
            }}
        >
            {/* Top Row */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => onToggle(item.id)}
                    style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                >
                    <Ionicons
                        name={item.completed ? "checkbox" : "square-outline"}
                        size={22}
                        color={item.completed ? "#4CAF50" : "#aaa"}
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                            color: isOverdue ? "#ff4d4d" : "#888"    ,
                            textDecorationLine: item.completed ? "line-through" : "none",
                            fontSize: 16,
                            fontWeight: "600",
                        }}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#ff4d4d" />
                </TouchableOpacity>
            </View>

            {/* Description */}
            {item.description ? (
                <Text
                    style={{
                        color: "#aaa",
                        marginTop: 6,
                        marginLeft: 32,
                    }}
                >
                    {item.description}
                </Text>
            ) : null}

            {/* Bottom Meta */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    marginLeft: 32,
                }}
            >
                {/* Priority */}
                <View style={{
                    backgroundColor: getPriorityColor(item.priority),
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6
                }}>
                    <Text style={{ color: "white", fontSize: 12 }}>
                        {item.priority}
                    </Text>
                </View>

                {/* Due Date */}
                {item.dueDate ? (
                    <Text style={{ color: "#888" }}>
                        📅 {item.dueDate}
                    </Text>
                ) : null}
            </View>
        </View>
    );
}
