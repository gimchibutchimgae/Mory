import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CharacterSelectionProps {
  onPress: () => void;
  isSelected: boolean;
  image: ImageSourcePropType;
}

export default function CharacterSelection({
  onPress,
  isSelected,
  image,
}: CharacterSelectionProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.characterCircle,
          isSelected ? styles.selectedCircle : null,
        ]}
      >
        <Image source={image} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  characterCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  selectedCircle: {
    backgroundColor: Colors.secondaryBackground
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
