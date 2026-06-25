import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecuperacaoSenha({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperarSenha = () => {
    if (!email.trim()) {
      Alert.alert('Campo obrigatorio', 'Informe o e-mail cadastrado.');
      return;
    }

    Alert.alert(
      'Solicitacao enviada',
      'Se este e-mail estiver cadastrado, voce recebera instrucoes para recuperar sua senha.'
    );

    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>{'\u{1F512}'}</Text>
          </View>

          <Text style={styles.titulo}>
            Recuperar Senha
          </Text>

          <Text style={styles.subtitulo}>
            Informe seu e-mail de acesso.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>

            <TextInput
              style={styles.input}
              placeholder="contato@clinica.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.8}
            onPress={handleRecuperarSenha}
          >
            <Text style={styles.textoBotao}>
              Enviar instrucoes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.textoVoltar}>
              Voltar para login
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
    marginBottom: 35
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
    fontSize: 38
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
    color: '#444',
    marginBottom: 8,
    fontWeight: '600'
  },

  input: {
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    fontSize: 16
  },

  botao: {
    marginTop: 10,
    height: 55,
    backgroundColor: '#1d7624',
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

  btnVoltar: {
    marginTop: 25,
    alignItems: 'center'
  },

  textoVoltar: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }
});
