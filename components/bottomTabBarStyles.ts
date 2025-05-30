import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const bottomTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%', // Take full width
    height: 73,    // As per CSS
    backgroundColor: '#000000', // As per CSS
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1, // Optional: to give a slight separation from content above
    borderTopColor: '#222222', // Optional: subtle border color
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Distribute space equally
  },
  icon: {
    marginBottom: 4, // Space between icon and label
  },
  label: {
    fontSize: 10, // Adjust as needed
    fontFamily: 'Basic', // Assuming 'Basic' font is available
  },
  activeLabel: {
    color: '#00C9FF', // Blue color for active tab text
  },
  inactiveLabel: {
    color: '#FFFFFF', // White color for inactive tab text
  },
});
