import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';

export default function Dashboard({ navigation, clinica }) {
  const nomeClinica = clinica?.nome || 'Clinica';

  const servicos = [
    {
      id: 1,
      titulo: 'Clientes',
      icone: '\u{1F465}',
      tela: 'Clientes'
    },
    {
      id: 2,
      titulo: 'Leads',
      icone: '\u{1F4C8}',
      tela: 'Leads'
    },
    {
      id: 3,
      titulo: 'Agenda',
      icone: '\u{1F4C5}',
      tela: 'Agenda'
    },
    {
      id: 4,
      titulo: 'Chatbot',
      icone: '\u{1F916}',
      tela: 'Chatbot'
    },
    {
      id: 5,
      titulo: 'Configuracoes',
      icone: '\u2699\uFE0F',
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
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.saudacao} numberOfLines={1}>
              {nomeClinica}
            </Text>

            <Text style={styles.subsaudacao}>
              CRM Inteligente para Clinicas
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{'\u{1F9B7}'}</Text>
          </View>
        </View>

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

          <Text style={styles.emojiDestaque}>{'\u{1F4C8}'}</Text>
        </TouchableOpacity>

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

        <Text style={styles.tituloSecao}>
          Modulos
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

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
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
    alignItems: 'center',
    marginBottom: 30
  },

  headerText: {
    flex: 1,
    paddingRight: 16
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
