import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

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
        <MaterialCommunityIcons name="star" size={60} color={isSelected ? Colors.yellow : Colors.white} />
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
    backgroundColor: Colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCircle: {
    borderColor: Colors.yellow,
  },
  labelText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.white,
  },
});
