import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import InputWithIcon from '@/components/InputWithIcon';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { loginApi } from '@/api/auth';
import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginApi(email, password);
      if (response.accessToken) {
        signIn(response.accessToken);
        router.replace('/(tabs)/');
      } else {
        Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다.');
      }
    } catch (error: any) {
      Alert.alert('로그인 실패', error.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await WebBrowser.openBrowserAsync(
      'https://mory-backend-production.up.railway.app/auth/google'
    );
    // TODO: Google 로그인 후 리다이렉트 처리 (예: 토큰 저장 및 화면 전환)
    // 현재는 단순히 브라우저를 여는 역할만 합니다.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>mory</Text>

      <InputWithIcon iconName="account" placeholder="아이디" value={email} onChangeText={setEmail} />
      <InputWithIcon iconName="lock" placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Link href="/signup" style={styles.linkText}>회원가입</Link>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>SNS 계정으로 로그인</Text>
        <View style={styles.divider} />
      </View>

      <GoogleSignInButton onPress={() => console.log('Google Sign In')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primaryBackground,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: Colors.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  linkText: {
    color: Colors.white,
    marginHorizontal: 5,
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.darkGray,
  },
  dividerText: {
    color: Colors.lightGray,
    marginHorizontal: 10,
    fontSize: 14,
  },
});