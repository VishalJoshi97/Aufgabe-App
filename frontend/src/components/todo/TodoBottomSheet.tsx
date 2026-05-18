import {
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";

import { forwardRef, useMemo } from "react";

import { Text } from "react-native";

import TodoInput from "./TodoInput";

const TodoBottomSheet = forwardRef(({ onAdd }: any, ref: any) => {

    const snapPoints = useMemo(() => ["55%"], []);

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            backgroundStyle={{
                backgroundColor: "#1e1e1e",
            }}
            handleIndicatorStyle={{
                backgroundColor: "#666",
            }}
        >
            <BottomSheetView
                style={{
                    flex: 1,
                    padding: 16,
                }}
            >
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
            </BottomSheetView>
        </BottomSheetModal>
    );
});

TodoBottomSheet.displayName = "TodoBottomSheet";

export default TodoBottomSheet;