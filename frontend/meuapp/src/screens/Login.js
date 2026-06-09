import React, { useState } from 'react';
import {  View,  Text,  StyleSheet,  TextInput,  TouchableOpacity,  Alert,  KeyboardAvoidingView,  Platform,  SafeAreaView} from 'react-native';

import api from '../services/api';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrar, setLembrar] = useState(false);

  const handleLogin = async () => {

    if (!email || !senha) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha e-mail e senha.'
      );
      return;
    }
    // LOGIN TEMPORÁRIO
    navigation.navigate('Dashboard');

    /*try {

      const response = await api.post('/auth/login', {
        email,
        senha
      });

      console.log(response.data);

      Alert.alert(
        'Sucesso',
        'Login realizado com sucesso!'
      );

      navigation.navigate('Dashboard');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Usuário ou senha inválidos.'
      );
    } */
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        {/* Header */}
        <View style={styles.header}>

          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🦷</Text>
          </View>

          <Text style={styles.titulo}>
            Clinica
          </Text>

          <Text style={styles.subtitulo}>
            Seu sorriso em dia, sempre.
          </Text>

        </View>

        {/* Formulário */}
        <View style={styles.form}>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              E-mail
            </Text>

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
            <Text style={styles.label}>
              Senha
            </Text>

            <TextInput
              style={styles.input}
              placeholder="••••••••"
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

            <TouchableOpacity>
              <Text style={styles.linkEsqueceu}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>

          </View>


          <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.8}
            onPress={handleLogin}
          >

            <Text style={styles.textoBotao}>
              Entrar
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={styles.btnCadastro}
            onPress={() => navigation.navigate('Cadastro')}
          >

            <Text style={styles.textoCadastro}>
              Não possui conta?
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
    backgroundColor: '#F8FAF8'
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
    color: '#2E7D32'
  },

  subtitulo: {
    color: '#666',
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
    color: '#444',
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
    color: '#666',
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
    color: '#666'
  },

  textoCadastroHighlight: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }

});