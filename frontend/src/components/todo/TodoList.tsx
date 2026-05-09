import { FlatList } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete }: any) {
    return (
        <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TodoItem
                    item={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            )}
        />
    );
}
