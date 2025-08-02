import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '@/components/BackButton';
import { Colors } from '@/constants/Colors';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import * as WebBrowser from 'expo-web-browser';

export default function SignUpScreen() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const result = await WebBrowser.openBrowserAsync(
      'https://mory-backend-production.up.railway.app/auth/google'
    );
    // TODO: Google 로그인 후 리다이렉트 처리 (예: 토큰 저장 및 화면 전환)
    // 현재는 단순히 브라우저를 여는 역할만 합니다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>회원가입</Text>
        <View style={{ width: 24 }} />{/* Placeholder for alignment */}
      </View>

      <Text style={styles.instructionText}>구글 계정으로 간편하게 회원가입하세요.</Text>

      <GoogleSignInButton onPress={handleGoogleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.primaryBackground,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  instructionText: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 40,
    textAlign: 'center',
  },
});
