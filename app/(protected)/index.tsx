import BottomTabBar from '@/components/BottomTabBar'; // Added import
import CategoryCard from '@/components/CategoryCard'; // Import the new CategoryCard component
import HomeScreenHeader from '@/components/HomeScreenHeader';
import { CATEGORY_IMAGES } from '@/constants/images'; // Import image constants
import { useAuth } from "@/utils/authContext";
import { useLocation } from "@/utils/locationContext";
import { usePathname, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from "react";
import { Platform, StatusBar as ReactNativeStatusBar, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { isLoggedIn, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isLocationSet, locationData } = useLocation(); // Removed setLocationData if not used here directly

  useEffect(() => {
    console.log("HomeScreen - isLocationSet:", isLocationSet, "Current Path:", pathname);
    if (!isLocationSet) {
      // Only open modal if we are on the main tab screen (or the direct protected route if not using tabs immediately)
      // and location is not set.
      // Adjust '/(tabs)' if your home screen path within the (tabs) group is different, e.g., '/(tabs)/home'
      // Or if your direct home screen path is different, e.g. '/home' if not in a tab group initially.
      // For a typical (tabs) setup, the initial route might be just '/(tabs)' or it might resolve to '/(tabs)/[initial-tab-name]'
      // We check if the current path is the root of the protected routes or the root of the tabs.
      if (pathname === '/' || pathname === '/(tabs)') { 
        console.log("Location not set, opening modal from HomeScreen...");
        router.push('/location-select');
      }
    }
  }, [isLocationSet, pathname, router]); // Depend on isLocationSet, pathname, and router

  // The ProtectedLayout should handle isLoggedIn and initial isLocationSet checks.
  // If we reach here, user is logged in. The useEffect handles redirect if location is not set on this specific screen.

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <HomeScreenHeader />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.categorySection}>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {[
              { name: 'All', icon: CATEGORY_IMAGES.ALL_ICON },
              { name: 'Men', icon: CATEGORY_IMAGES.MEN_ICON },
              { name: 'Women', icon: CATEGORY_IMAGES.WOMEN_ICON },
              { name: 'Kids', icon: CATEGORY_IMAGES.KIDS_ICON },
            ].map((categoryItem) => (
            
              <CategoryCard key={categoryItem.name} categoryName={categoryItem.name} iconSource={categoryItem.icon!} />
            ))}
          </ScrollView>
        </View>

        
        <View style={styles.feedSection}>
         
         
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.feedItemPlaceholder}>
              <Text>Feed Item {item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A2E', // Dark background for the whole screen, can be adjusted
    paddingTop: Platform.OS === 'android' ? ReactNativeStatusBar.currentHeight : 0,
    
  },
  container: {
    flex: 1,
   
 
  },
  contentContainer: {
   
  backgroundColor:"black",
   display : "flex",
   flexDirection : "column",
   gap : 10,
   marginTop: 0,
 
  },
  categorySection: {
    marginTop : 0,
   
    paddingHorizontal: 10,
    backgroundColor: 'black',
    //  marginBottom: 10,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    paddingHorizontal: 10,

    borderWidth : 1,
    borderColor : "white"
  },
  categoryScroll: {
   marginTop : 0
  },
  feedSection: {
    paddingHorizontal: 10,
  },
  feedItemPlaceholder: {
    backgroundColor: '#24243E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150, // Example height
  },
});

