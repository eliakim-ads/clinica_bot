import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native';

import api from '../services/api';

export default function Cadastro({ navigation }) {

  const [nomeClinica, setNomeClinica] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async () => {

    if (
      !nomeClinica ||
      !cnpj ||
      !telefone ||
      !email ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos.'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        'Erro',
        'As senhas não conferem.'
      );
      return;
    }

    try {

      await api.post('/clinicas', {
        nome: nomeClinica,
        cnpj,
        telefone,
        email,
        senha
      });

      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso!'
      );

      navigation.navigate('Login');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível realizar o cadastro.'
      );

    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.header}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🦷</Text>
            </View>

            <Text style={styles.titulo}>
              Criar Conta
            </Text>

            <Text style={styles.subtitulo}>
              Cadastre sua clínica no Bucal UP
            </Text>

          </View>

          <View style={styles.form}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Clínica</Text>

              <TextInput
                style={styles.input}
                placeholder="Clínica Sorriso Feliz"
                value={nomeClinica}
                onChangeText={setNomeClinica}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CNPJ</Text>

              <TextInput
                style={styles.input}
                placeholder="00.000.000/0001-00"
                value={cnpj}
                onChangeText={setCnpj}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone</Text>

              <TextInput
                style={styles.input}
                placeholder="(11) 99999-9999"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>

              <TextInput
                style={styles.input}
                placeholder="contato@clinica.com"
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
                placeholder="••••••••"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Senha</Text>

              <TextInput
                style={styles.input}
                placeholder="••••••••"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>

            <TouchableOpacity
              style={styles.botao}
              activeOpacity={0.8}
              onPress={handleCadastro}
            >
              <Text style={styles.textoBotao}>
                Criar Conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.textoLogin}>
                Já possui conta?
                <Text style={styles.textoLoginHighlight}>
                  {' '}Entrar
                </Text>
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>

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
    paddingHorizontal: 30
  },

  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30
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
    marginBottom: 40
  },

  inputGroup: {
    marginBottom: 18
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
    marginTop: 15,
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

  btnLogin: {
    marginTop: 25,
    alignItems: 'center'
  },

  textoLogin: {
    color: '#666'
  },

  textoLoginHighlight: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }

});