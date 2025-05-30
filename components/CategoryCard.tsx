import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { categoryCardStyles } from './categoryCardStyles';

interface CategoryCardProps {
  categoryName: string;
  iconSource: ImageSourcePropType;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryName, iconSource }) => {
  return (
    <View style={categoryCardStyles.outerContainer}>
      <View style={categoryCardStyles.styledCard} />
      <Image 
        source={iconSource} 
        style={categoryCardStyles.iconImage} 
        resizeMode="cover" // Using cover, image might be cropped to fit 57x53 in its defined area
      />
      <Text style={categoryCardStyles.categoryLabel} numberOfLines={1}>
        {categoryName}
      </Text>
    </View>
  );
};

export default CategoryCard;
