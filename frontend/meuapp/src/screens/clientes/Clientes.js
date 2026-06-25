import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';

export default function Clientes({ navigation }) {

  const [busca, setBusca] = useState('');

  // temporário até integrar com backend
  const clientes = [
    {
      idCliente: 1,
      nome: 'Maria Silva',
      telefone: '21999999999',
      dataCadastro: '12/06/2026'
    },
    {
      idCliente: 2,
      nome: 'João Souza',
      telefone: '21988888888',
      dataCadastro: '15/06/2026'
    }
  ];

  const filtrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(busca.toLowerCase())
  );

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

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.idCliente.toString()}
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
              📞 {item.telefone}
            </Text>

            <Text>
              Cadastro: {item.dataCadastro}
            </Text>

          </TouchableOpacity>

        )}
      />


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
