import React from 'react';
import {  View,  Text,  TouchableOpacity,  ScrollView,  StatusBar,  StyleSheet
} from 'react-native';

export default function Dashboard({ navigation }) {

  const servicos = [
    {
      id: 1,
      titulo: 'Clientes',
      icone: '👥',
      tela: 'Clientes'
    },
    {
      id: 2,
      titulo: 'Leads',
      icone: '📈',
      tela: 'Leads'
    },
    {
      id: 3,
      titulo: 'Agenda',
      icone: '📅',
      tela: 'Agenda'
    },
    {
      id: 4,
      titulo: 'Chatbot',
      icone: '🤖',
      tela: 'Chatbot'
    },
    {
      id: 5,
      titulo: 'Configurações',
      icone: '⚙️',
      tela: 'Configuracoes'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAF8" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.saudacao}>
              Clínica Logo
            </Text>

            <Text style={styles.subsaudacao}>
              CRM Inteligente para Clínicas
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>🦷</Text>
          </View>
        </View>

        {/* CARD PRINCIPAL */}
        <TouchableOpacity
          style={styles.cardDestaque}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Leads')}
        >
          <View>
            <Text style={styles.tituloDestaque}>
              Leads em Atendimento
            </Text>

            <Text style={styles.subtituloDestaque}>
              Visualizar Funil
            </Text>
          </View>

          <Text style={styles.emojiDestaque}>
            📈
          </Text>

        </TouchableOpacity>

        {/* INDICADORES */}
        <Text style={styles.tituloSecao}>
          Resumo do Dia
        </Text>

        <View style={styles.cardsResumo}>

          <View style={styles.cardResumo}>
            <Text style={styles.numeroResumo}>25</Text>
            <Text style={styles.textoResumo}>Clientes</Text>
          </View>

          <View style={styles.cardResumo}>
            <Text style={styles.numeroResumo}>8</Text>
            <Text style={styles.textoResumo}>Leads</Text>
          </View>

        </View>

        <View style={styles.cardsResumo}>

          <View style={styles.cardResumo}>
            <Text style={styles.numeroResumo}>5</Text>
            <Text style={styles.textoResumo}>Agenda Hoje</Text>
          </View>

          <View style={styles.cardResumo}>
            <Text style={styles.numeroResumo}>3</Text>
            <Text style={styles.textoResumo}>Chatbot</Text>
          </View>

        </View>

        {/* SERVIÇOS */}
        <Text style={styles.tituloSecao}>
          Módulos
        </Text>

        <View style={styles.grid}>

          {servicos.map((item) => (

            <TouchableOpacity
              key={item.id}
              style={styles.itemGrid}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.tela)}
            >

              <Text style={styles.emojiGrid}>
                {item.icone}
              </Text>

              <Text style={styles.tituloGrid}>
                {item.titulo}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.tabBar}>

        <TouchableOpacity style={styles.tabItem}>
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
    backgroundColor: '#F8FAF8'
  },

  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },

  saudacao: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32'
  },

  subsaudacao: {
    color: '#666',
    marginTop: 5
  },

  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#1d7624',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  avatar: {
    fontSize: 32
  },

  cardDestaque: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  tituloDestaque: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },

  subtituloDestaque: {
    color: '#FFF',
    marginTop: 5
  },

  emojiDestaque: {
    fontSize: 40
  },

  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15
  },

  cardsResumo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },

  cardResumo: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 20,
    borderRadius: 20,
    elevation: 2
  },

  numeroResumo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32'
  },

  textoResumo: {
    color: '#666',
    marginTop: 5
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  itemGrid: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2
  },

  emojiGrid: {
    fontSize: 35
  },

  tituloGrid: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#2E7D32'
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