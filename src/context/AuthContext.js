import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('activeUser');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            await AsyncStorage.removeItem('activeUser');
            setUser(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    loadSession();
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      await AsyncStorage.multiSet([
        ['registeredUser', JSON.stringify(userData)],
        ['activeUser', JSON.stringify(userData)]
      ]);
      setUser(userData);
      return { success: true };
    } catch {
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const stored = await AsyncStorage.getItem('registeredUser');
      if (!stored) {
        return { success: false, message: 'No account found. Please sign up.' };
      }

      let parsed;
      try {
        parsed = JSON.parse(stored);
      } catch {
        return { success: false, message: 'Saved account data is invalid. Please sign up again.' };
      }

      if (parsed && parsed.email === email && parsed.password === password) {
        await AsyncStorage.setItem('activeUser', JSON.stringify(parsed));
        setUser(parsed);
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('activeUser');
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user, login, signup, logout, loading }), [user, login, signup, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};