import BottomSheet from "@gorhom/bottom-sheet";
import { forwardRef, useMemo } from "react";

import { View, Text } from "react-native";
import TodoInput from "./TodoInput";

const TodoBottomSheet = forwardRef(({ onAdd }: any, ref: any) => {
    const snapPoints = useMemo(() => ["55%"], []);

    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            backgroundStyle={{
                backgroundColor: "#1e1e1e",
            }}
            handleIndicatorStyle={{
                backgroundColor: "#666",
            }}
        >
            <View style={{ flex: 1, padding: 16 }}>
                <Text
                    style={{
                        color: "white",
                        fontSize: 20,
                        marginBottom: 16,
                        fontWeight: "600",
                    }}
                >
                    Create Todo
                </Text>

                <TodoInput onAdd={onAdd} />
            </View>
        </BottomSheet>
    );
});

TodoBottomSheet.displayName = "TodoBottomSheet";

export default TodoBottomSheet;
