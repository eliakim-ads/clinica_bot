import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

const STATUS = [
  { valor: 'TODOS', rotulo: 'Todos' },
  { valor: 'ABERTO', rotulo: 'Abertos' },
  { valor: 'GANHO', rotulo: 'Ganhos' },
  { valor: 'PERDIDO', rotulo: 'Perdidos' }
];

export default function Leads({ navigation }) {
  const [statusSelecionado, setStatusSelecionado] = useState('TODOS');
  const [leads, setLeads] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const carregarLeads = useCallback(async () => {
    try {
      setCarregando(true);

      const response = await api.get('/leads');
      setLeads(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
      setLeads([]);

      Alert.alert(
        'Erro',
        error.response?.data?.mensagem || 'Não foi possível carregar os Leads.'
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarLeads();
    }, [carregarLeads])
  );

  const leadsFiltrados = statusSelecionado === 'TODOS'
    ? leads
    : leads.filter(item => item.status === statusSelecionado);

  function corStatus(status) {
    switch (status) {
      case 'ABERTO':
        return '#E07800';
      case 'GANHO':
        return '#2E7D32';
      case 'PERDIDO':
        return '#C62828';
      default:
        return '#666';
    }
  }

  function formatarData(dataCriacao) {
    if (!dataCriacao) {
      return 'Data não informada';
    }

    const data = new Date(dataCriacao);

    if (Number.isNaN(data.getTime())) {
      return dataCriacao;
    }

    return data.toLocaleDateString('pt-BR');
  }

  function renderLista() {
    if (carregando) {
      return (
        <View style={styles.feedbackContainer}>
          <ActivityIndicator size="large" color="#2E7D32" />
          <Text style={styles.feedbackText}>Carregando Leads...</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={leadsFiltrados}
        keyExtractor={item => item.idCadastroLead.toString()}
        contentContainerStyle={[
          styles.listaConteudo,
          leadsFiltrados.length === 0 && styles.listaVazia
        ]}
        ListEmptyComponent={(
          <Text style={styles.feedbackText}>
            {leads.length === 0
              ? 'Nenhum Lead cadastrado.'
              : 'Nenhum Lead encontrado para este status.'}
          </Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('LeadDetalhe', {
              idLead: item.idCadastroLead,
              lead: item
            })}
          >
            <View style={styles.cardCabecalho}>
              <Text style={styles.nome} numberOfLines={1}>
                {item.nome}
              </Text>

              <View
                style={[
                  styles.status,
                  { backgroundColor: corStatus(item.status) }
                ]}
              >
                <Text style={styles.textoStatus}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.detalhe}>Interesse: {item.interesse}</Text>
            <Text style={styles.detalhe}>{item.telefone}</Text>
            <Text style={styles.data}>{formatarData(item.dataCriacao)}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Leads</Text>

      <View style={styles.filtros}>
        {STATUS.map(item => (
          <TouchableOpacity
            key={item.valor}
            style={[
              styles.filtro,
              statusSelecionado === item.valor && styles.filtroAtivo
            ]}
            onPress={() => setStatusSelecionado(item.valor)}
          >
            <Text
              style={[
                styles.filtroTexto,
                statusSelecionado === item.valor && styles.filtroTextoAtivo
              ]}
              numberOfLines={1}
            >
              {item.rotulo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => navigation.navigate('LeadForm')}
      >
        <Text style={styles.textoBotao}>+ Novo Lead</Text>
      </TouchableOpacity>

      {renderLista()}

      {/* MENU INFERIOR */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.tabIcon}>{'\u{1F3E0}'}</Text>
          <Text style={styles.tabText}>Início</Text>
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
          <Text style={styles.tabIconActive}>{'\u{1F4C8}'}</Text>
          <Text style={styles.tabTextActive}>Leads</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20
  },

  filtros: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20
  },

  filtro: {
    flex: 1,
    minHeight: 40,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    elevation: 1
  },

  filtroAtivo: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#2E7D32'
  },

  filtroTexto: {
    color: '#555',
    fontSize: 12
  },

  filtroTextoAtivo: {
    color: '#1B5E20',
    fontWeight: 'bold'
  },

  botaoNovo: {
    backgroundColor: '#2E7D32',
    minHeight: 50,
    justifyContent: 'center',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20
  },

  textoBotao: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  listaConteudo: {
    paddingBottom: 90
  },

  listaVazia: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  card: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2
  },

  cardCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6
  },

  nome: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  detalhe: {
    color: '#555',
    marginTop: 3
  },

  data: {
    color: '#777',
    fontSize: 12,
    marginTop: 8
  },

  status: {
    minWidth: 70,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },

  textoStatus: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11
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
