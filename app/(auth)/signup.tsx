import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '@/components/BackButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import InputWithIcon from '@/components/InputWithIcon';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>회원가입</Text>
        <View style={{ width: 24 }} />{/* Placeholder for alignment */}
      </View>

      <Text style={styles.label}>이름</Text>
      <InputWithIcon placeholder="이름을 입력하세요" value={name} onChangeText={setName} />

      <Text style={styles.label}>비밀번호</Text>
      <InputWithIcon placeholder="비밀번호를 입력하세요" secureTextEntry showEyeIcon value={password} onChangeText={setPassword} />
      <InputWithIcon placeholder="다시 한번 입력해주세요." secureTextEntry showEyeIcon value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/initial-setup')}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 10,
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: Colors.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  signupButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
