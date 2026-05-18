import { View, Text } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function TodoStats({ todos }: any) {

    const total = todos.length;

    const completed = todos.filter((t: any) => t.completed).length;

    const pending = total - completed;

    const highPriority = todos.filter(
        (t: any) => t.priority === "HIGH"
    ).length;

    const completionRate =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    const stats = [
        {
            label: "Total",
            value: total,
            color: "#4CAF50",
        },
        {
            label: "Completed",
            value: completed,
            color: "#2196F3",
        },
        {
            label: "Pending",
            value: pending,
            color: "#ff9800",
        },
        {
            label: "High",
            value: highPriority,
            color: "#ff4d4d",
        },
    ];

    return (
        <View style={{ marginBottom: 20 }}>

            {/* Top Stats Grid */}
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {stats.map((stat, index) => (
                    <Animated.View
                        key={stat.label}
                        entering={FadeInUp.delay(index * 100)}
                        style={{
                            width: "48%",
                            backgroundColor: "#1e1e1e",
                            padding: 16,
                            borderRadius: 14,
                            marginBottom: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: "#888",
                                fontSize: 13,
                            }}
                        >
                            {stat.label}
                        </Text>

                        <Text
                            style={{
                                color: stat.color,
                                fontSize: 26,
                                fontWeight: "700",
                                marginTop: 4,
                            }}
                        >
                            {stat.value}
                        </Text>
                    </Animated.View>
                ))}
            </View>

            {/* Progress Card */}
            <Animated.View
                entering={FadeInUp.delay(500)}
                style={{
                    backgroundColor: "#1e1e1e",
                    padding: 16,
                    borderRadius: 14,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: 12,
                    }}
                >
                    Productivity
                </Text>

                {/* Progress Bar */}
                <View
                    style={{
                        height: 10,
                        backgroundColor: "#333",
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <View
                        style={{
                            width: `${completionRate}%`,
                            height: "100%",
                            backgroundColor: "#4CAF50",
                            borderRadius: 10,
                        }}
                    />
                </View>

                <Text
                    style={{
                        color: "#aaa",
                        marginTop: 10,
                    }}
                >
                    {completionRate}% completed
                </Text>
            </Animated.View>
        </View>
    );
}
