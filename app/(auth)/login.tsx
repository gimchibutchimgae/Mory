import { Link, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import InputWithIcon from '@/components/InputWithIcon';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/app/context/AuthContext.ts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Theme } from '@/constants/Themes';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [autoLogin, setAutoLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const handleLogin = async () => {
    let valid = true;
    setUsernameError(undefined);
    setPasswordError(undefined);

    if (!username) {
      setUsernameError('이름을 입력해주세요.');
      valid = false;
    }

    if (!password) {
      setPasswordError('비밀번호를 입력해주세요.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);
    try {
      await signIn();
      router.replace('/(tabs)/');
    } catch (error) {
      // 실제 로그인 실패 시 백엔드에서 오는 오류 메시지를 처리할 수 있습니다.
      // 여기서는 일반적인 메시지를 표시합니다.
      setPasswordError('이름 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      <InputWithIcon iconName="account" placeholder="아이디" value={username} onChangeText={setUsername} error={usernameError} />
      <InputWithIcon iconName="lock" placeholder="비밀번호" secureTextEntry value={password} onChangeText={setPassword} error={passwordError} />

      <View style={styles.autoLoginContainer}>
        <TouchableOpacity onPress={() => setAutoLogin(!autoLogin)} style={styles.checkboxButton}>
          <MaterialCommunityIcons
            name={autoLogin ? "checkbox-marked" : "checkbox-blank-outline"}
            size={20}
            color={Theme.colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.autoLoginText}>자동 로그인</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color={Theme.colors.white} /> : <Text style={styles.loginButtonText}>로그인</Text>}
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

      <GoogleSignInButton onPress={() => console.log('Google Sign In')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing.medium,
    backgroundColor: Theme.colors.primaryBackground,
  },
  logoImage: {
    width: 450, // 이미지 너비 조정
    height: 200, // 이미지 높이 조정
    marginBottom: 50, // 기존 텍스트의 marginBottom과 유사하게 조정
  },
  autoLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: Theme.spacing.small,
    marginBottom: Theme.spacing.medium,
    alignItems: 'center',
  },
  checkboxButton: {
    marginRight: Theme.spacing.small,
  },
  autoLoginText: {
    color: Theme.colors.white,
  },
  loginButton: {
    backgroundColor: Theme.colors.secondaryBackground,
    width: '100%',
    paddingVertical: Theme.spacing.medium,
    borderRadius: Theme.borderRadius.medium,
    alignItems: 'center',
    marginBottom: Theme.spacing.medium,
  },
  loginButtonText: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.medium,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: Theme.spacing.medium,
  },
  linkText: {
    color: Theme.colors.white,
    marginHorizontal: Theme.spacing.small,
    fontSize: Theme.fontSizes.small,
  },
  separator: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.small,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.large,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.darkGray,
  },
  dividerText: {
    color: Theme.colors.lightGray,
    marginHorizontal: Theme.spacing.small,
    fontSize: Theme.fontSizes.small,
  },
});
