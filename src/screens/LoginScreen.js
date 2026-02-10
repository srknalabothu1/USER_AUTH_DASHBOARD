import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validators';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    const validation = validateLoginForm({ email, password });
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    const res = await login(validation.values.email, validation.values.password);
    if (!res.success) {
      setError(res.message || 'Incorrect credentials.');
      return;
    }

    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          if (error) setError('');
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Password"
          style={[styles.input, styles.passwordInput]}
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (error) setError('');
          }}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setPasswordVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
        >
          <Text style={styles.toggleIcon}>{passwordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  passwordRow: { position: 'relative' },
  passwordInput: { paddingRight: 72 },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  toggleIcon: { fontSize: 18 },
  errorText: { color: '#dc3545', marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff' },
  link: { marginTop: 15, color: '#007bff', textAlign: 'center' }
});
