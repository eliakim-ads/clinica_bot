import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

export default function Chatbot({ navigation }) {

  const [tipoSelecionado, setTipoSelecionado] = useState('BOAS_VINDAS');

  const [mensagem, setMensagem] = useState(
    'Olá! Seja bem-vindo à Clínica. Como podemos ajudá-lo?'
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>

        <Text style={styles.titulo}>
          Chatbot
        </Text>

        <Text style={styles.subtitulo}>
          Mensagens automáticas
        </Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setTipoSelecionado('BOAS_VINDAS')}
        >
          <Text style={styles.textoCard}>
            👋 Boas Vindas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setTipoSelecionado('CONSULTA')}
        >
          <Text style={styles.textoCard}>
            🦷 Consulta
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setTipoSelecionado('HORARIO')}
        >
          <Text style={styles.textoCard}>
            🕒 Horários
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setTipoSelecionado('CONVENIO')}
        >
          <Text style={styles.textoCard}>
            📋 Convênios
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => setTipoSelecionado('ATENDENTE')}
        >
          <Text style={styles.textoCard}>
            👩 Atendimento Humano
          </Text>
        </TouchableOpacity>


        <View style={styles.editor}>

          <Text style={styles.label}>
            Tipo selecionado
          </Text>

          <Text style={styles.tipo}>
            {tipoSelecionado}
          </Text>

          <Text style={styles.label}>
            Resposta automática
          </Text>

          <TextInput
            multiline
            numberOfLines={8}
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
          />

          <TouchableOpacity style={styles.botaoSalvar}>
            <Text style={styles.textoBotao}>
              Salvar Mensagem
            </Text>
          </TouchableOpacity>

        </View>

        <View style={{ height: 80 }} />

      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.tabBar}>

        <TouchableOpacity style={styles.tabItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabTextActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Clientes')}
        >
          <Text style={styles.tabIcon}>👥</Text>
          <Text style={styles.tabText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Leads')}
        >
          <Text style={styles.tabIcon}>📈</Text>
          <Text style={styles.tabText}>Leads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Configuracoes')}
        >
          <Text style={styles.tabIcon}>⚙️</Text>
          <Text style={styles.tabText}>Config.</Text>
        </TouchableOpacity>

      </View>
    </View>

  );

}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAF8'
  },

  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    padding: 20
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5
  },

  subtitulo: {
    color: '#666',
    marginBottom: 20
  },

  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2
  },

  textoCard: {
    fontSize: 16,
    color: '#333'
  },

  editor: {
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 3
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444'
  },

  tipo: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    height: 180,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#DDD'
  },

  botaoSalvar: {
    backgroundColor: '#2E7D32',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 20
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },

  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    elevation: 10
  },

  tabItem: {
    alignItems: 'center'
  },

  tabIconActive: {
    fontSize: 22
  },

  tabTextActive: {
    color: '#2E7D32',
    fontWeight: 'bold'
  },

  tabIcon: {
    fontSize: 22
  },

  tabText: {
    color: '#666'
  },

  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    elevation: 10
  },

  tabItem: {
    alignItems: 'center'
  },

  tabIconActive: {
    fontSize: 22
  },

  tabTextActive: {
    color: '#2E7D32',
    fontWeight: 'bold'
  },

  tabIcon: {
    fontSize: 22
  },

  tabText: {
    color: '#666'
  }


});