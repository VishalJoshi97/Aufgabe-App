import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider } from "@/src/context/AuthContext";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
