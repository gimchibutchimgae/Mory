import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import InputWithIcon from '@/components/InputWithIcon';
import { useAuth } from '@/app/context/AuthContext';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !password || !confirmPassword) {
      Alert.alert('오류', '모든 필드를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await signUp();
      router.push('/initial-setup');
    } catch (error) {
      Alert.alert('회원가입 실패', '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

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

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.signupButtonText}>회원가입</Text>}
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
