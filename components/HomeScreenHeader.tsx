import { useLocation } from '@/utils/locationContext';
import { Ionicons } from '@expo/vector-icons'; // MaterialCommunityIcons not used, removed
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreenHeader() {
  const { locationData, isLocationLoading } = useLocation();

  const lat = locationData?.coords?.latitude.toFixed(4) || '...';
  const lon = locationData?.coords?.longitude.toFixed(4) || '...';
  const locationString = isLocationLoading ? "Loading..." : `Lat: ${lat}, Lon: ${lon}`;
  // In a real app, you'd reverse geocode lat/lon to a human-readable address here
  // For now, we'll use the placeholder from Figma or the lat/lon.
  const displayAddress = locationData ? locationString : "Home - 156, 15th Flr, Maker Chamb...";

  return (
    <LinearGradient
      colors={['#00C9FF', '#000000']}
      locations={[0, 0.6635]} 
      style={styles.headerContainer}
    >
      {/* Top Row: Location and Icons */}
      <View style={styles.topRow}>
        <View style={styles.locationContainer}>
          <Ionicons name="home-outline" size={29} color="#FFFFFF" style={styles.locationIcon} />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationTitle}>Home</Text>
            <Text style={styles.locationAddress} numberOfLines={1}>{displayAddress}</Text>
          </View>
          <Ionicons name="chevron-down" size={18} color="#FFFFFF" style={styles.arrowIcon} />
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar Row */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          placeholderTextColor="#555555" // Darker placeholder for contrast on white
        />
        {/* You can add a search icon inside the TextInput or next to it if needed */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
marginBottom  : 0 ,
   
    // As per Figma Group 522 / Rectangle 115
    width: '100%', // Explicitly set width
    paddingTop: 20, // from Figma 'top: 37px' for 'Group 296'
    paddingHorizontal: 23, // from Figma 'left: 23px'
    paddingBottom: 10, // This might need adjustment depending on content placement within 250px height
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22, // from Figma (109px top of search - (37px top of Home + 54px height of Group 296 approx))
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow location to take available space
  },
  locationIcon: {
    marginRight: 5, // from Figma (55px left of 'Home' text - 23px left of icon - 29px width of icon)
  },
  locationTextContainer: {
    marginRight: 5, // Space before arrow
    flexShrink: 1, // Allow text to shrink if needed
  },
  locationTitle: {
    fontFamily: 'Calistoga', // Ensure 'Calistoga' font is loaded
    fontSize: 24,
    color: '#FFFFFF',
    lineHeight: 31, // from Figma
  },
  locationAddress: {
    fontFamily: 'Calistoga', // Ensure 'Calistoga' font is loaded
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 21, // from Figma
  },
  arrowIcon: {
    // marginLeft: 'auto', // Pushes to the right of text, but fixed position from Figma better
    // Based on Figma: left: 125px for arrow, Home text starts at 55px. Icon 29px + Text 77px = 106px. Arrow is after.
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15, // Spacing between heart and profile icons (365px - 320px - 35px width)
  },
  searchContainer: {
    // Corresponds to 'Group 291'
    // top: 109px from Figma, handled by marginBottom of topRow
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10, // from Figma 'Rectangle 34'
    height: 33, // from Figma
    paddingHorizontal: 16.54, // from Figma (39.54px left of text - 23px left of bar)
    fontFamily: 'Basic', // Ensure 'Basic' font is loaded
    fontSize: 16,
    color: '#000000',
  },
});
