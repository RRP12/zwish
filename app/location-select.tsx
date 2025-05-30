import { useLocation } from '@/utils/locationContext'; // Import useLocation
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const LocationSelectScreen = () => {
  const router = useRouter();
  const { setLocationData } = useLocation(); // Use context's setLocationData
  // const [location, setLocation] = useState<Location.LocationObject | null>(null); // Local state no longer needed for the data itself
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Placeholder for image assets
  const zwishhBannerPlaceholder = 'https://via.placeholder.com/315x77.png?text=Zwishh+Banner';
  const mapIllustration = require('/Users/rushikeshpatil/Desktop/zwish/assets/images/Maps.png');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.topBlueBackground}>
          {/* Using text for Zwishh as image path is not available */}
          <Text style={styles.zwishhTitle}>Zwishh</Text>
          <Text style={styles.tagline}>Get your perfect style in minutes</Text>
        </View>

        <View style={styles.mainContentContainer}>
          <Image source={mapIllustration} style={styles.mapImage} />

          <Text style={styles.turnOnLocationText}>Turn on your location</Text>

          <TouchableOpacity 
            style={[styles.continueButton, isLoadingLocation && styles.disabledButton]}
            onPress={async () => {
              setIsLoadingLocation(true);
              setErrorMsg(null);
              let { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setIsLoadingLocation(false);
                return;
              }

              try {
                let currentLocation = await Location.getCurrentPositionAsync({});
                // setLocation(currentLocation); // Set via context instead
                setLocationData(currentLocation); // Update context
                console.log('Location fetched and set in context:', currentLocation);
                router.replace({ pathname: '/(protected)' }); // Navigate to the protected group, which should default to (tabs)
              } catch (error) {
                console.error('Error fetching location:', error);
                setErrorMsg('Failed to fetch location. Please try again.');
              }
              setIsLoadingLocation(false);
            }}
            disabled={isLoadingLocation}
          >
            <Text style={styles.continueButtonText}>
              {isLoadingLocation ? 'Getting Location...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
          {/* {location && <Text>Lat: {location.coords.latitude}, Lon: {location.coords.longitude}</Text>} */}
          

          <Text style={styles.orText}>Or</Text>

          <Text style={styles.selectAddressText}>Select your address</Text>

          {/* Saved Address Example */}
          <View style={styles.addressItemContainer}>
            <Ionicons name="home-outline" size={28} color="#000000" style={styles.addressIcon} />
            <View style={styles.addressTextContainer}>
              <Text style={styles.addressType}>Home</Text>
              <Text style={styles.addressDetail}>Home - 156, 15th Flr, Maker Chamb...</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.addNewLocationButton}>
            <Ionicons name="search-outline" size={22} color="#000000" />
            <Text style={styles.addNewLocationButtonText}>Add new Location</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00C9FF',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  topBlueBackground: {
    backgroundColor: '#00C9FF',
    paddingHorizontal: 28,
    paddingTop: 55, // Approximate from CSS 'top: 55px'
    paddingBottom: 40, // Adjusted for visual balance before white card
    alignItems: 'flex-start',
  },
  zwishhTitle: {
    // Placeholder for the image '20250321_214702 1'
    // Using text styles from 'Get your perfect style...'
    fontFamily: 'Lalezar', // Use actual font if available
    fontSize: 48, // Larger for title
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    // left: -15px from CSS is tricky, using padding and alignment
  },
  tagline: {
    fontFamily: 'Lalezar', // Use actual font if available
    fontSize: 32,
    lineHeight: 50,
    color: '#FFFFFF',
    width: 218, // from CSS
  },
  mainContentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 31, // from CSS 'left: 31px' for buttons
    paddingTop: 30, // Space for map image
    alignItems: 'center',
  },
  mapImage: {
    width: 186,
    height: 209,
    marginBottom: 20, // Space after map
  },
  turnOnLocationText: {
    fontFamily: 'Calistoga', // Use actual font if available
    fontSize: 24,
    lineHeight: 31,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    width: '100%', // Match 'width: 351px' relative to padding
    maxWidth: 351,
    height: 52,
    backgroundColor: '#86D0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    fontFamily: 'Archivo Black', // Use actual font if available
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
  },
  orText: {
    fontFamily: 'Cambo', // Use actual font if available
    fontSize: 24,
    lineHeight: 27,
    color: '#000000',
    marginBottom: 20,
  },
  selectAddressText: {
    fontFamily: 'Calistoga', // Use actual font if available
    fontSize: 24,
    lineHeight: 31,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  addressItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 351, // Matches button width
    marginBottom: 20,
    paddingLeft: 5, // Align with 'left: 36px' for icon
  },
  addressIcon: {
    marginRight: 10,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressType: {
    fontFamily: 'Calistoga', // Use actual font if available
    fontSize: 24,
    lineHeight: 31,
    color: '#000000',
  },
  addressDetail: {
    fontFamily: 'Calistoga', // Use actual font if available
    fontSize: 20,
    lineHeight: 26,
    color: '#000000',
  },
  addNewLocationButton: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 351,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Space at bottom
  },
  addNewLocationButtonText: {
    fontFamily: 'Archivo Black', // Use actual font if available
    fontSize: 20,
    lineHeight: 22,
    color: '#000000',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  }
});

export default LocationSelectScreen;
