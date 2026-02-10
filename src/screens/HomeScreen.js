import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subtitle}>Welcome{user?.name ? `, ${user.name}` : ''}</Text>
      {!!user?.email && <Text style={styles.detail}>{user.email}</Text>}
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  detail: { fontSize: 14, marginBottom: 24, textAlign: 'center' },
  button: { backgroundColor: '#dc3545', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff' }
});
