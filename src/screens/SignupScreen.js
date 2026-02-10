import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { validateSignupForm } from '../utils/validators';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignup = () => {
    const validation = validateSignupForm({ name, email, password, confirmPassword });
    if (!validation.ok) {
      setError(validation.error);
      return;
    }

    setError('');
    signup(validation.values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={(t) => {
          setName(t);
          if (error) setError('');
        }}
      />
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
          placeholder="Create Password"
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

      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Confirm Password"
          style={[styles.input, styles.passwordInput]}
          value={confirmPassword}
          onChangeText={(t) => {
            setConfirmPassword(t);
            if (error) setError('');
          }}
          secureTextEntry={!confirmPasswordVisible}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setConfirmPasswordVisible((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={confirmPasswordVisible ? 'Hide password' : 'Show password'}
        >
          <Text style={styles.toggleIcon}>{confirmPasswordVisible ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={{color: '#fff'}}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  link: { marginTop: 15, color: '#007bff', textAlign: 'center' }
});