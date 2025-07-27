import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '@/constants/Themes';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.medium,
    backgroundColor: Theme.colors.primaryBackground,
  },
  title: {
    fontSize: Theme.fontSizes.large,
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  link: {
    marginTop: Theme.spacing.medium,
    paddingVertical: Theme.spacing.medium,
  },
  linkText: {
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.white,
  },
});
