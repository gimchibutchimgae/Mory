import { Link, useRouter } from 'expo-router';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import InputWithIcon from '@/components/InputWithIcon';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useAuth } from '@/app/context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [autoLogin, setAutoLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn();
    router.replace('/(tabs)/');
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
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