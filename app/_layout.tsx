import { useFonts } from "expo-font"
import "react-native-reanimated"

import { SessionProvider } from "@/ctx"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Stack } from "expo-router"
import { StatusBar } from "react-native"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Make the app route primary and remove tabs completely */}
        <Stack.Screen name="(app)"  options = {{headerShown: false} }/>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="otp-verify" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </SessionProvider>
  )
}
