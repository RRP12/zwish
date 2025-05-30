import { useAuth } from "@/utils/authContext";
// import { LocationProvider } from "@/utils/locationContext"; // Removed redundant import
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { useLocation } from '@/utils/locationContext'; // Import useLocation to check location status

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const authState = useAuth();
  const { isLocationSet, isLocationLoading } = useLocation(); // Get location status and loading state

  // Add debugging for authentication and location state
  useEffect(() => {
    console.log('Protected layout auth state:', {
      isAuthLoading: authState.isAuthLoading,
      isLoggedIn: authState.isLoggedIn,
      hasAccessToken: !!authState.accessToken,
      hasRefreshToken: !!authState.refreshToken
    });
    console.log('Protected layout location state:', { isLocationSet, isLocationLoading });
  }, [authState.isAuthLoading, authState.isLoggedIn, authState.accessToken, authState.refreshToken, isLocationSet, isLocationLoading]);

  // Wait for both auth state and location data to finish loading
  if (authState.isAuthLoading || isLocationLoading) {
    console.log('ProtectedLayout: Auth or Location is loading...', { authLoading: authState.isAuthLoading, locLoading: isLocationLoading });
    return null; // Or a loading spinner
  }

  // If not logged in, redirect to login
  if (!authState.isLoggedIn) {
    console.log('ProtectedLayout: User not logged in, redirecting to login');
    return <Redirect href="/login" />;
  }

  // If logged in, and location loading is complete, but location is not set, redirect to location-select screen
  if (!isLocationSet) {
    console.log('ProtectedLayout: Location not set (and loading finished), redirecting to location-select');
    return <Redirect href="/location-select" />;
  }

  // If logged in and location is set (and loading finished), show the main content
  console.log('ProtectedLayout: User logged in and location is set. Rendering stack.');
  return (
    // <LocationProvider> // Removed redundant provider
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" /> {/* Ensure this matches your directory structure */}
        <Stack.Screen
          name="location-select" // This should match the filename app/location-select.tsx
          options={{
            presentation: "modal",
            headerShown: false, // Assuming you don't want a header for this modal
          }}
        />
        {/* You had a generic 'modal' screen, if it's still needed, ensure its name is unique */}
        {/* <Stack.Screen
          name="modal" // If this is a different modal, rename it or ensure it's distinct
          options={{
            presentation: "modal",
            // headerShown: false,
          }}
        /> */}
        {/* Add other screens like modal-with-stack if they are part of this layout 
        <Stack.Screen
          name="modal-with-stack"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        /> */}
      </Stack>
    // </LocationProvider> // Removed redundant provider
  );
}