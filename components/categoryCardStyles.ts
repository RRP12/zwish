import { StyleSheet } from 'react-native';

export const categoryCardStyles = StyleSheet.create({
  // Represents "Group 534" - the overall container for each card item
  outerContainer: {
    marginTop : 20,
    width: 100,
    height: 80,
    marginRight: 10,
    //   borderWidth : 1,
    // borderColor : "white"
    // Default spacing, can be adjusted in parent ScrollView if needed
    // position: 'relative' is implicit for children with absolute positioning in React Native
  },
  // Represents "Rectangle 177" - the visible black card background
  styledCard: {
    position: 'absolute',
    width: 90, // Or '100%' if outerContainer is exactly 90
    height: 35,
    left: 0, // Relative to outerContainer's left (10px from Figma canvas - 10px from Group 534 left)
    top: 19,  // Relative to outerContainer's top (170px from Figma canvas - 151px from Group 534 top)
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 10,
  },
  // Represents the icon image
  iconImage: {
    position: 'absolute',
    width: 57,
    height: 53,
    left: 2,  // Relative to outerContainer's left (12px from Figma canvas - 10px from Group 534 left)
    top: 0,   // Relative to outerContainer's top (151px from Figma canvas - 151px from Group 534 top)
    zIndex: 1, // To ensure it's visually on top of styledCard if they overlap
  },
  // Represents the text label like "All"
  categoryLabel: {
    position: 'absolute',
    width: 15, // Explicit width from CSS (e.g., for "All")
    height: 18, // From line-height in CSS
    left: 70, // Relative to outerContainer's left (80px from Figma canvas - 10px from Group 534 left)
    top: 28,  // Relative to outerContainer's top (179px from Figma canvas - 151px from Group 534 top)
    fontFamily: 'Basic',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#FFFFFF',
    // textAlign: 'center', // With a fixed small width and left positioning, text align might not be as relevant
    zIndex: 1, // To ensure it's visually on top of styledCard
  },
});
