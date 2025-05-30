import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_LOCATION_KEY = 'user_location';

interface LocationContextType {
  locationData: Location.LocationObject | null;
  setLocationData: (location: Location.LocationObject | null) => void;
  isLocationSet: boolean;
  clearLocationData: () => void;
  isLocationLoading: boolean; // To indicate if we are still loading from storage
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locationData, setLocationDataState] = useState<Location.LocationObject | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true); // Start as true

  useEffect(() => {
    const loadLocation = async () => {
      setIsLocationLoading(true);
      try {
        const storedLocation = await AsyncStorage.getItem(USER_LOCATION_KEY);
        if (storedLocation) {
          setLocationDataState(JSON.parse(storedLocation));
        }
      } catch (e) {
        console.error("Failed to load location from storage", e);
      } finally {
        setIsLocationLoading(false);
      }
    };
    loadLocation();
  }, []);

  const setLocationData = async (location: Location.LocationObject | null) => {
    setLocationDataState(location);
    try {
      if (location) {
        await AsyncStorage.setItem(USER_LOCATION_KEY, JSON.stringify(location));
      } else {
        await AsyncStorage.removeItem(USER_LOCATION_KEY);
      }
    } catch (e) {
      console.error("Failed to save location to storage", e);
    }
  };

  const clearLocationData = async () => {
    setLocationDataState(null);
    try {
      await AsyncStorage.removeItem(USER_LOCATION_KEY);
    } catch (e) {
      console.error("Failed to clear location from storage", e);
    }
  };

  return (
    <LocationContext.Provider value={{ 
      locationData, 
      setLocationData, 
      isLocationSet: !!locationData, 
      clearLocationData,
      isLocationLoading
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
