import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming usage of Ionicons
import { bottomTabBarStyles as styles } from './bottomTabBarStyles';

interface TabBarItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ iconName, label, isActive, onPress }) => {
  const iconColor = isActive ? '#00C9FF' : '#FFFFFF';
  const labelStyle = isActive ? styles.activeLabel : styles.inactiveLabel;

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabItem}>
      <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

interface BottomTabBarProps {
  // Later, we'll pass navigation state and actions here
  // For now, it's static
}

const BottomTabBar: React.FC<BottomTabBarProps> = () => {
  // Placeholder for active tab, to be managed by navigation state later
  const [activeTab, setActiveTab] = React.useState('Home');

  const tabs = [
    { name: 'Home', icon: 'home', label: 'Home' }, // Solid version
    { name: 'Categories', icon: 'apps', label: 'Categories' }, // Solid version (apps is a 3x3 grid)
    { name: 'Feeds', icon: 'play-circle', label: 'Feeds' }, // Solid version
    { name: 'Try-on', icon: 'person', label: 'Try-on' }, // Solid version
    { name: 'Cart', icon: 'cart', label: 'Cart' }, // Solid version
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabBarItem
          key={tab.name}
          iconName={tab.icon as keyof typeof Ionicons.glyphMap}
          label={tab.label}
          isActive={activeTab === tab.name}
          onPress={() => setActiveTab(tab.name)} // Simple state change for now
        />
      ))}
    </View>
  );
};

export default BottomTabBar;
