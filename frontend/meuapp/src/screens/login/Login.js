import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import api from '../../services/api';
import { saveSession } from '../../services/authStorage';

export default function Login({ navigation, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Campos obrigatorios', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);

      const response = await api.post('/auth/login', {
        email,
        senha
      });

      if (lembrar) {
        await saveSession(response.data);
      }

      onLoginSuccess(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Usuario ou senha invalidos.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>{'\u{1F9B7}'}</Text>
          </View>

          <Text style={styles.titulo}>Clinica</Text>

          <Text style={styles.subtitulo}>
            Seu sorriso em dia, sempre.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              placeholder="********"
              placeholderTextColor="#999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>

          <View style={styles.rowActions}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setLembrar(!lembrar)}
            >
              <View
                style={[
                  styles.customCheckbox,
                  lembrar && styles.checkboxChecked
                ]}
              >
                {lembrar && (
                  <View style={styles.checkboxInner} />
                )}
              </View>

              <Text style={styles.checkboxText}>
                Lembrar de mim
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
              <Text style={styles.linkEsqueceu}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.botao, carregando && styles.botaoDesabilitado]}
            activeOpacity={0.8}
            disabled={carregando}
            onPress={handleLogin}
          >
            <Text style={styles.textoBotao}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCadastro}
            onPress={() => navigation.navigate('Cadastro')}
          >
            <Text style={styles.textoCadastro}>
              Nao possui conta?
              <Text style={styles.textoCadastroHighlight}>
                {' '}Cadastre-se
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052301'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30
  },

  header: {
    alignItems: 'center',
    marginBottom: 40
  },

  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1d7624',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3
  },

  logoEmoji: {
    fontSize: 40
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF'
  },

  subtitulo: {
    color: '#E0E0E0',
    marginTop: 5
  },

  form: {
    width: '100%'
  },

  inputGroup: {
    marginBottom: 20
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8
  },

  input: {
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16
  },

  rowActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },

  checkboxChecked: {
    backgroundColor: '#4CAF50'
  },

  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 2
  },

  checkboxText: {
    color: '#E0E0E0',
    fontSize: 13
  },

  linkEsqueceu: {
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 13
  },

  botao: {
    backgroundColor: '#1d7624',
    height: 55,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },

  botaoDesabilitado: {
    opacity: 0.7
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },

  btnCadastro: {
    marginTop: 25,
    alignItems: 'center'
  },

  textoCadastro: {
    color: '#E0E0E0'
  },

  textoCadastroHighlight: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }
});
