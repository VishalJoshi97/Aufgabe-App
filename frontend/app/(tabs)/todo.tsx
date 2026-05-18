import {View, Text, FlatList} from "react-native";
import { useEffect, useState,useRef } from "react";
import TodoInput from "@/src/components/todo/TodoInput";
import TodoList from "@/src/components/todo/TodoList";
import {
    getTodosApi,
    createTodoApi,
    toggleTodoApi,
    deleteTodoApi,
} from "@/src/api/todoApi";
import FloatingAddButton from "@/src/components/todo/FloatingAddButton";
import TodoBottomSheet from "@/src/components/todo/TodoBottomSheet";
import TodoStats from "@/src/components/todo/TodoStats";
import TodoItem from "@/src/components/todo/TodoItem";


export default function TodoScreen() {
    const [todos, setTodos] = useState<any[]>([]);

    const bottomSheetRef = useRef<any>(null);

    const openBottomSheet = () => {
        bottomSheetRef.current?.present();
    };
    const loadTodos = async () => {
        const res = await getTodosApi();
        setTodos(sortTodos(res.data));
    };

    useEffect(() => {
        loadTodos();
    }, []);

         const handleAdd = async (data: {
    title: string;
    description?: string;
    priority?: string;
    dueDate?: string;
        }) => {
    const payload = {
        title: data.title,
        description: data.description || "",
        priority: data.priority || "LOW",
        dueDate: data.dueDate || null, // important for backend
    };

    // console.log("SENDING TODO:", payload);

    const res = await createTodoApi(payload);
             setTodos(sortTodos([res.data, ...todos]));

             bottomSheetRef.current?.dismiss();
         };


    const handleToggle = async (id: number) => {
        const res = await toggleTodoApi(id);
        setTodos(todos.map(t => t.id === id ? res.data : t));
    };

    const handleDelete = async (id: number) => {
        await deleteTodoApi(id);
        setTodos(todos.filter(t => t.id !== id));
    };


    //sorting
const sortTodos = (todos: any[]) => {
    const priorityOrder: any = {
        HIGH: 1,
        MEDIUM: 2,
        LOW: 3,
    };

    return [...todos].sort((a, b) => {
        // 1. Priority sort
        const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (pDiff !== 0) return pDiff;

        // 2. Due date sort
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }

        return 0;
    });
};


    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#121212",
                paddingHorizontal: 16,
                paddingTop: 16,
            }}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: 26,
                    marginBottom: 16,
                    fontWeight: "700",
                }}
            >
                Your Tasks
            </Text>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 140,
                }}
                ListHeaderComponent={
                    <TodoStats todos={todos} />
                }
                renderItem={({ item }) => (
                    <TodoItem
                        item={item}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                )}
            />

            <TodoBottomSheet
                ref={bottomSheetRef}
                onAdd={handleAdd}
            />

            <FloatingAddButton onPress={openBottomSheet} />
        </View>
    );
}
