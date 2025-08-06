import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/app/context/AuthContext';
import { googleSignInApi, loginApi } from '@/api/auth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const handleGoogleSignIn = async () => {
    try {
      const { status, accessToken, email: googleEmail, name, provider } = await googleSignInApi();

      console.log('Google Login Result:');
      console.log('Status:', status);
      console.log('AccessToken:', accessToken);
      console.log('Email:', googleEmail);
      console.log('Name:', name);

      if (status === 'login' && accessToken) {
        signIn(accessToken);
        router.replace('/(tabs)/');
      } else if (status === 'register' && googleEmail && name) {
        router.replace({
          pathname: '/(auth)/initial-setup',
          params: { email: googleEmail, name, provider: provider || 'google' },
        });
      } else {
        Alert.alert('Google 로그인 실패', '유효하지 않은 응답입니다.');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Google 로그인 오류', '로그인 중 오류가 발생했습니다.');
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await loginApi('guest', 'guest');
      if (response && response.accessToken) {
        signIn(response.accessToken);
        router.replace('/(tabs)/');
      } else {
        Alert.alert('Guest 로그인 실패', '유효하지 않은 응답입니다.');
      }
    } catch (error: any) {
      console.error('Guest Login Error:', error);
      Alert.alert('Guest 로그인 오류', error.message || '알 수 없는 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>mory</Text>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>SNS 계정으로 로그인</Text>
        <View style={styles.divider} />
      </View>

      <GoogleSignInButton onPress={handleGoogleSignIn} />

      {__DEV__ && (
        <TouchableOpacity style={styles.guestLoginButton} onPress={handleGuestLogin}>
          <Text style={styles.guestLoginButtonText}>Guest 로그인 (개발용)</Text>
        </TouchableOpacity>
      )}
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
  guestLoginButton: {
    backgroundColor: Colors.secondaryBackground,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  guestLoginButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
