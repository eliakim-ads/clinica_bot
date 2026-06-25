import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function Leads({ navigation }) {

  const [statusSelecionado, setStatusSelecionado] = useState('TODOS');

  // dados simulados
  const leads = [
    {
      idCadastroLead: 1,
      nome: 'Maria Silva',
      telefone: '21999999999',
      interesse: 'CONSULTA',
      status: 'ABERTO',
      data: '10/06/2026'
    },
    {
      idCadastroLead: 2,
      nome: 'Carlos Souza',
      telefone: '21988888888',
      interesse: 'CONVENIO',
      status: 'GANHO',
      data: '09/06/2026'
    },
    {
      idCadastroLead: 3,
      nome: 'Ana Lima',
      telefone: '21977777777',
      interesse: 'HORARIO',
      status: 'PERDIDO',
      data: '08/06/2026'
    }
  ];

  const leadsFiltrados =
    statusSelecionado === 'TODOS'
      ? leads
      : leads.filter(item => item.status === statusSelecionado);

  const corStatus = (status) => {

    switch (status) {

      case 'ABERTO':
        return '#FF9800';

      case 'GANHO':
        return '#4CAF50';

      case 'PERDIDO':
        return '#F44336';

      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Leads
      </Text>

      {/* filtros */}

      <View style={styles.filtros}>

        <TouchableOpacity
          style={styles.filtro}
          onPress={() => setStatusSelecionado('TODOS')}
        >
          <Text>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filtro}
          onPress={() => setStatusSelecionado('ABERTO')}
        >
          <Text>Abertos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filtro}
          onPress={() => setStatusSelecionado('GANHO')}
        >
          <Text>Ganhos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filtro}
          onPress={() => setStatusSelecionado('PERDIDO')}
        >
          <Text>Perdidos</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => navigation.navigate('LeadForm')}
      >
        <Text style={styles.textoBotao}>
          + Novo Lead
        </Text>
      </TouchableOpacity>


      <FlatList
        data={leadsFiltrados}
        keyExtractor={(item) => item.idCadastroLead.toString()}
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('LeadDetalhe', { lead: item })
            }
          >

            <Text style={styles.nome}>
              {item.nome}
            </Text>

            <Text>
              Interesse: {item.interesse}
            </Text>

            <Text>
              {item.telefone}
            </Text>

            <View
              style={[
                styles.status,
                { backgroundColor: corStatus(item.status) }
              ]}
            >
              <Text style={styles.textoStatus}>
                {item.status}
              </Text>
            </View>

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20
  },

  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  filtro: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2
  },

  botaoNovo: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  status: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15
  },

  textoStatus: {
    color: '#FFF',
    fontWeight: 'bold'
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
