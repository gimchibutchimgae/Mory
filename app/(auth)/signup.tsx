import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackButton from '@/components/BackButton';
import { useState } from 'react';
import { Theme } from '@/constants/Themes';
import InputWithIcon from '@/components/InputWithIcon';
import { useAuth } from '@/app/context/AuthContext.ts';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>(undefined);

  const handleSignUp = async () => {
    let valid = true;
    setNameError(undefined);
    setPasswordError(undefined);
    setConfirmPasswordError(undefined);

    if (!name) {
      setNameError('이름을 입력해주세요.');
      valid = false;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 6자 이상이어야 합니다.');
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('비밀번호 확인을 입력해주세요.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);
    try {
      await signUp();
      router.push('/initial-setup');
    } catch (error) {
      // 실제 회원가입 실패 시 백엔드에서 오는 오류 메시지를 처리할 수 있습니다.
      // 여기서는 일반적인 메시지를 표시합니다.
      setPasswordError('회원가입에 실패했습니다. 다시 시도해주세요.');
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
      <InputWithIcon placeholder="아이디를 입력하세요" value={name} onChangeText={setName} error={nameError} />

      <Text style={styles.label}>비밀번호</Text>
      <InputWithIcon placeholder="비밀번호를 입력하세요" secureTextEntry showEyeIcon value={password} onChangeText={setPassword} error={passwordError} />
      <InputWithIcon placeholder="다시 한번 입력해주세요." secureTextEntry showEyeIcon value={confirmPassword} onChangeText={setConfirmPassword} error={confirmPasswordError} />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator color={Theme.colors.white} /> : <Text style={styles.signupButtonText}>회원가입</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.medium,
    backgroundColor: Theme.colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.large,
  },
  title: {
    fontSize: Theme.fontSizes.title,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  label: {
    fontSize: Theme.fontSizes.medium,
    fontWeight: 'bold',
    color: Theme.colors.white,
    marginBottom: Theme.spacing.small,
    marginTop: Theme.spacing.medium,
  },
  signupButton: {
    backgroundColor: Theme.colors.secondaryBackground,
    width: '100%',
    paddingVertical: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.medium,
    alignItems: 'center',
    marginTop: Theme.spacing.large,
  },
  signupButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
