import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTheme } from '../ThemeContext'; // Hook para tema

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos vazios', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Login bem-sucedido:', user.email);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      Alert.alert('Erro de Login', 'E-mail ou senha inválidos. Tente novamente.');
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Ainda não tem conta? Crie uma
      </Text>

      {/* Botão de alternar tema */}
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
        <Text style={styles.themeToggleText}>
          {isDarkMode ? '☀️ Claro' : '🌙 Escuro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: width * 0.1,
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
    },
    title: {
      fontSize: width * 0.08,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: isDarkMode ? '#fff' : '#000',
    },
    input: {
      height: 50,
      borderColor: isDarkMode ? '#555' : '#000',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    },
    button: {
      backgroundColor: '#b5f7cd',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 16,
    },
    link: {
      marginTop: 20,
      color: '#839813',
      textAlign: 'center',
    },
    themeToggle: {
      position: 'absolute',
      bottom: 40,
      right: 20,
      backgroundColor: isDarkMode ? '#000' : '#b5f7cd',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    themeToggleText: {
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
  });
