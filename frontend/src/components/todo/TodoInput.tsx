import { View, TextInput, TouchableOpacity, Text, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TodoInput({ onAdd }: any) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");

    const [date, setDate] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const formatDate = (d: Date) => {
        return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const handleAdd = () => {
        if (!title.trim()) return;

        onAdd({
            title,
            description,
            priority,
            dueDate: date ? formatDate(date) : null,
        });

        setTitle("");
        setDescription("");
        setDate(null);
    };

    return (
        <View style={{ marginBottom: 16 }}>

            <TextInput
                placeholder="Title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
                style={inputStyle}
            />

            <TextInput
                placeholder="Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
                style={inputStyle}
            />

            {/* 📅 Date Picker Button */}
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={{
                    backgroundColor: "#1e1e1e",
                    padding: 12,
                    borderRadius: 10,
                    marginBottom: 8,
                }}
            >
                <Text style={{ color: date ? "white" : "#888" }}>
                    {date ? `Due: ${formatDate(date)}` : "Select Due Date"}
                </Text>
            </TouchableOpacity>

            {/* 📅 Picker */}
            {showPicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowPicker(Platform.OS === "ios"); // iOS stays open
                        if (selectedDate) setDate(selectedDate);
                    }}
                    style={{backgroundColor:"green"}}
                />
            )}

            {/* Priority */}
            <View style={{ flexDirection: "row", marginVertical: 8 }}>
                {["LOW", "MEDIUM", "HIGH"].map(p => (
                    <TouchableOpacity
                        key={p}
                        onPress={() => setPriority(p)}
                        style={{
                            padding: 8,
                            marginRight: 8,
                            borderRadius: 8,
                            backgroundColor: priority === p ? "#4CAF50" : "#333",
                        }}
                    >
                        <Text style={{ color: "white" }}>{p}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={handleAdd}
                style={{
                    backgroundColor: "#4CAF50",
                    padding: 14,
                    borderRadius: 10,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                    Add Task
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const inputStyle = {
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
};
