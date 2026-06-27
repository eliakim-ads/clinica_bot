import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

export default function Clientes({ navigation }) {
  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function carregarClientes() {
    try {
      setCarregando(true);

      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Nao foi possivel carregar os clientes.');
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarClientes();
    }, [])
  );

  const filtrados = clientes.filter(cliente =>
    cliente.nome?.toLowerCase().includes(busca.toLowerCase())
  );

  function formatarData(dataCadastro) {
    if (!dataCadastro) {
      return 'Nao informado';
    }

    const data = new Date(dataCadastro);

    if (Number.isNaN(data.getTime())) {
      return dataCadastro;
    }

    return data.toLocaleDateString('pt-BR');
  }

  function renderConteudo() {
    if (carregando) {
      return (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.feedbackText}>Carregando clientes...</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idCliente.toString()}
        contentContainerStyle={filtrados.length === 0 && styles.listaVazia}
        ListEmptyComponent={(
          <Text style={styles.feedbackText}>
            Nenhum cliente encontrado.
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate(
                'ClienteDetalhe',
                { cliente: item }
              )
            }
          >
            <Text style={styles.nome}>
              {item.nome}
            </Text>

            <Text>
              {'\u{1F4DE}'} {item.telefone}
            </Text>

            <Text>
              Cadastro: {formatarData(item.dataCadastro)}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Clientes
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar cliente"
        value={busca}
        onChangeText={setBusca}
      />

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => navigation.navigate('ClienteForm')}
      >
        <Text style={styles.textoBotao}>
          + Novo Cliente
        </Text>
      </TouchableOpacity>

      {renderConteudo()}

      {/* MENU INFERIOR */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.tabIconActive}>{'\u{1F3E0}'}</Text>
          <Text style={styles.tabTextActive}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Clientes')}
        >
          <Text style={styles.tabIcon}>{'\u{1F465}'}</Text>
          <Text style={styles.tabText}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Leads')}
        >
          <Text style={styles.tabIcon}>{'\u{1F4C8}'}</Text>
          <Text style={styles.tabText}>Leads</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Configuracoes')}
        >
          <Text style={styles.tabIcon}>{'\u2699\uFE0F'}</Text>
          <Text style={styles.tabText}>Config.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAF8',
    padding: 20
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15
  },

  botaoNovo: {
    backgroundColor: '#2E7D32',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  feedbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80
  },

  feedbackText: {
    color: '#666',
    marginTop: 12,
    textAlign: 'center'
  },

  listaVazia: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80
  },

  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
