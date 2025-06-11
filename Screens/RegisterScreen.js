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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useTheme } from '../ThemeContext'; // <- Importando o contexto de tema

const { width } = Dimensions.get('window');

export default function RegisterScreen({ navigation }) {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const errors = [];

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const lowercaseRegex = /[a-z]/;

    if (!email || !password || !confirmPassword) {
      errors.push('Preencha todos os campos.');
    }

    if (password.length < 8) {
      errors.push('A senha deve ter pelo menos 8 caracteres.');
    }

    if (!uppercaseRegex.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!numberRegex.test(password)) {
      errors.push('A senha deve conter pelo menos um número.');
    }

    if (!specialCharRegex.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial.');
    }

    if (!lowercaseRegex.test(password)) {
      errors.push('A senha deve ter pelo menos uma letra minúscula.');
    }

    if (password !== confirmPassword) {
      errors.push('As senhas não coincidem.');
    }

    if (errors.length > 0) {
      Alert.alert('Erro no Registro', errors.join('\n'));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Erro no registro:', error.message);
      let msg = 'Erro ao criar conta.';
      if (error.code === 'auth/email-already-in-use') {
        msg = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'E-mail inválido.';
      }
      Alert.alert('Erro', msg);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Já tem conta? Faça login
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
