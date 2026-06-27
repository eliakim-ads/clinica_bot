import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

export default function Cadastro({ navigation }) {

  const [nomeClinica, setNomeClinica] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    const dadosCadastro = {
      nome: nomeClinica.trim(),
      cnpj: cnpj.trim(),
      telefone: telefone.trim(),
      email: email.trim().toLowerCase(),
      senha
    };

    if (
      !dadosCadastro.nome ||
      !dadosCadastro.cnpj ||
      !dadosCadastro.telefone ||
      !dadosCadastro.email ||
      !dadosCadastro.senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        'Campos obrigatorios',
        'Preencha todos os campos.'
      );
      return;
    }

    if (dadosCadastro.senha !== confirmarSenha) {
      Alert.alert(
        'Erro',
        'As senhas nao conferem.'
      );
      return;
    }

    try {
      setCarregando(true);

      await api.post('/clinicas', dadosCadastro);

      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );

    } catch (error) {

      console.log(error);

      const mensagem =
        error.response?.data?.mensagem ||
        'Nao foi possivel realizar o cadastro.';

      Alert.alert(
        'Erro',
        mensagem
      );

    } finally {
      setCarregando(false);
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
              <Text style={styles.logoEmoji}>{'\u{1F9B7}'}</Text>
            </View>

            <Text style={styles.titulo}>
              Criar Conta
            </Text>

            <Text style={styles.subtitulo}>
              Cadastre sua clinica no Bucal UP
            </Text>

          </View>

          <View style={styles.form}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome da Clinica</Text>

              <TextInput
                style={styles.input}
                placeholder="Clinica Sorriso Feliz"
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

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="********"
                  secureTextEntry={!mostrarSenha}
                  value={senha}
                  onChangeText={setSenha}
                />

                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setMostrarSenha(valorAtual => !valorAtual)}
                  accessibilityRole="button"
                  accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  <MaterialCommunityIcons
                    name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar Senha</Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="********"
                  secureTextEntry={!mostrarConfirmarSenha}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                />

                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setMostrarConfirmarSenha(valorAtual => !valorAtual)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    mostrarConfirmarSenha
                      ? 'Ocultar confirmação de senha'
                      : 'Mostrar confirmação de senha'
                  }
                >
                  <MaterialCommunityIcons
                    name={mostrarConfirmarSenha ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.botao, carregando && styles.botaoDesabilitado]}
              activeOpacity={0.8}
              disabled={carregando}
              onPress={handleCadastro}
            >
              <Text style={styles.textoBotao}>
                {carregando ? 'Cadastrando...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.textoLogin}>
                Ja possui conta?
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

  passwordContainer: {
    position: 'relative'
  },

  passwordInput: {
    paddingRight: 56
  },

  passwordToggle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 52,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center'
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

  botaoDesabilitado: {
    opacity: 0.7
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
