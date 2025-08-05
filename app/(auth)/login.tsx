import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert } from 'react-native';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/app/context/AuthContext';
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

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
