import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Themes } from '@/constants/Themes';

interface CharacterSelectionProps {
  label: string;
  onPress: () => void;
  isSelected: boolean;
}

export default function CharacterSelection({
  label,
  onPress,
  isSelected,
}: CharacterSelectionProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.characterCircle,
          isSelected ? styles.selectedCircle : null,
        ]}
      >
        <MaterialCommunityIcons name="star" size={60} color={isSelected ? Themes.yellow : Themes.white} />
      </View>
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  characterCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Themes.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCircle: {
    borderColor: Themes.yellow,
  },
  labelText: {
    marginTop: 10,
    fontSize: 16,
    color: Themes.white,
  },
});
