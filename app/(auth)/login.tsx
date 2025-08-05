import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import InputWithIcon from '@/components/InputWithIcon';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('guest');
  const [password, setPassword] = useState('guest');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://mory-backend-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        console.log('Login successful:', data);
        await signIn(data.accessToken);
        router.replace('/(tabs)');
      } else {
        console.error('Login failed:', data);
        Alert.alert('로그인 실패', data.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('오류', '로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync(
        'https://mory-backend-production.up.railway.app/auth/google'
      );

      if (result.type === 'success') {
        const successResult = result as WebBrowser.WebBrowserRedirectResult;
        if (successResult.url) {
          const url = new URL(successResult.url);
          const status = url.searchParams.get('status');
          const accessToken = url.searchParams.get('accessToken');
          const email = url.searchParams.get('email');
          const name = url.searchParams.get('name');

          console.log('Google Login Result:');
          console.log('Status:', status);
          console.log('AccessToken:', accessToken);
          console.log('Email:', email);
          console.log('Name:', name);

          if (status === 'login' && accessToken) {
            signIn(accessToken);
            router.replace('/(tabs)/');
          } else if (status === 'register' && email && name) {
            router.replace({
              pathname: '/(auth)/initial-setup',
              params: { email, name, provider: 'google' },
            });
          } else {
            Alert.alert('Google 로그인 실패', '유효하지 않은 응답입니다.');
          }
        }
      } else if (result.type === 'cancel') {
        Alert.alert('Google 로그인 취소', '로그인 과정이 취소되었습니다.');
      } else {
        Alert.alert('Google 로그인 실패', '알 수 없는 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Google 로그인 오류', '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>mory</Text>

      <InputWithIcon iconName="account" placeholder="아이디" value={email} onChangeText={setEmail} />
      <InputWithIcon iconName="lock" placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} />

      <View style={styles.autoLoginContainer}>
        <TouchableOpacity onPress={() => setAutoLogin(!autoLogin)} style={styles.checkboxButton}>
          <MaterialCommunityIcons
            name={autoLogin ? "checkbox-marked" : "checkbox-blank-outline"}
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.autoLoginText}>자동로그인</Text>
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>로그인</Text>
        )}
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>아이디 찾기</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.linkText}>비밀번호 찾기</Text>
        <Text style={styles.separator}>|</Text>
        <Link href="/signup" style={styles.linkText}>회원가입</Link>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>SNS 계정으로 로그인</Text>
        <View style={styles.divider} />
      </View>

      <GoogleSignInButton onPress={handleGoogleSignIn} />
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
  autoLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxButton: {
    marginRight: 5,
  },
  autoLoginText: {
    color: Colors.white,
  },
  loginButton: {
    backgroundColor: Colors.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: Colors.darkGray,
    opacity: 0.7,
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
  separator: {
    color: Colors.white,
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
