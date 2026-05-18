import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
    FadeInDown,
    FadeOutRight,
    LinearTransition,
} from "react-native-reanimated";

import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

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

    // Right Swipe Action
    const renderRightActions = () => {
        return (
            <TouchableOpacity
                onPress={() => onDelete(item.id)}
                style={{
                    backgroundColor: "#ff4d4d",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 80,
                    borderRadius: 12,
                    marginBottom: 10,
                }}
            >
                <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>

            <Animated.View
                entering={FadeInDown.duration(400)}
                exiting={FadeOutRight.duration(300)}
                layout={LinearTransition.springify()}
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
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <Ionicons
                            name={item.completed ? "checkbox" : "square-outline"}
                            size={22}
                            color={item.completed ? "#4CAF50" : "#aaa"}
                        />

                        <Text
                            style={{
                                marginLeft: 10,
                                color: item.completed ? "#777" : "#fff",
                                textDecorationLine: item.completed
                                    ? "line-through"
                                    : "none",
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        >
                            {item.title}
                        </Text>
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
                    <Text
                        style={{
                            color: getPriorityColor(item.priority),
                            fontWeight: "600",
                        }}
                    >
                        {item.priority}
                    </Text>

                    {item.dueDate ? (
                        <Text style={{ color: "#888" }}>
                            📅 {item.dueDate}
                        </Text>
                    ) : null}
                </View>
            </Animated.View>
        </Swipeable>
    );
}
