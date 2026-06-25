import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getCalendarDays(year, month) {
  const date = new Date(year, month, 1);
  const firstWeekday = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstWeekday; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

export default function Agenda({ navigation }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const days = getCalendarDays(year, month);

  const years = [year - 2, year - 1, year, year + 1, year + 2];

  function handlePrevMonth() {
    const newDate = new Date(year, month - 1, 1);
    setSelectedDate(newDate);
    setSelectedDay(1);
  }

  function handleNextMonth() {
    const newDate = new Date(year, month + 1, 1);
    setSelectedDate(newDate);
    setSelectedDay(1);
  }

  function handleSelectYear(newYear) {
    const newDate = new Date(newYear, month, 1);
    setSelectedDate(newDate);
    setSelectedDay(1);
  }

  function handleSelectDay(day) {
    if (!day) return;
    setSelectedDay(day);
  }

  const horarios = [
    { hora: '08:00', paciente: 'Livre', cor: '#E8F5E9' },
    { hora: '09:00', paciente: 'Maria Silva', cor: '#FFF3CD' },
    { hora: '10:00', paciente: 'João Santos', cor: '#CFE2FF' },
    { hora: '11:00', paciente: 'Livre', cor: '#E8F5E9' },
    { hora: '14:00', paciente: 'Ana Paula', cor: '#CFE2FF' },
    { hora: '15:00', paciente: 'Carlos Lima', cor: '#FFF3CD' },
    { hora: '16:00', paciente: 'Livre', cor: '#E8F5E9' }
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Agenda</Text>

        <View style={styles.cardCalendario}>
          <View style={styles.headerRow}>
            <Text style={styles.label}>Ano</Text>
            <View style={styles.yearRow}>
              {years.map((yearOption) => (
                <TouchableOpacity
                  key={yearOption}
                  style={[
                    styles.yearButton,
                    yearOption === year && styles.yearButtonActive
                  ]}
                  onPress={() => handleSelectYear(yearOption)}
                >
                  <Text
                    style={[
                      styles.yearButtonText,
                      yearOption === year && styles.yearButtonTextActive
                    ]}
                  >
                    {yearOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
              <Text style={styles.navButtonText}>◀</Text>
            </TouchableOpacity>

            <Text style={styles.mes}>
              {monthNames[month]} {year}
            </Text>

            <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
              <Text style={styles.navButtonText}>▶</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysRow}>
            {weekDays.map((weekday) => (
              <Text key={weekday} style={styles.weekDayText}>
                {weekday}
              </Text>
            ))}
          </View>

          <View style={styles.calendario}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={`${year}-${month}-${index}`}
                style={[
                  styles.dia,
                  day === selectedDay && styles.diaSelecionado,
                  !day && styles.diaEmpty
                ]}
                onPress={() => handleSelectDay(day)}
                disabled={!day}
              >
                <Text
                  style={[
                    styles.textoDia,
                    day === selectedDay && styles.textoSelecionado,
                    !day && styles.textoDiaEmpty
                  ]}
                >
                  {day || ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.subtitulo}>
          Horários do dia {selectedDay} de {monthNames[month]} de {year}
        </Text>

        {horarios.map((item, index) => (
          <View
            key={index}
            style={[styles.cardHorario, { backgroundColor: item.cor }]}
          >
            <Text style={styles.hora}>{item.hora}</Text>
            <Text style={styles.paciente}>{item.paciente}</Text>
          </View>
        ))}

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
    marginBottom: 20
  },

  cardCalendario: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 3
  },

  headerRow: {
    marginBottom: 16
  },

  label: {
    color: '#666',
    fontWeight: '600',
    marginBottom: 10
  },

  yearRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F1F8F2',
    marginBottom: 8,
    minWidth: 70,
    alignItems: 'center'
  },

  yearButtonActive: {
    backgroundColor: '#2E7D32'
  },

  yearButtonText: {
    color: '#2E7D32',
    fontWeight: '600'
  },

  yearButtonTextActive: {
    color: '#FFF'
  },

  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14
  },

  mes: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    flex: 1
  },

  navButton: {
    padding: 10
  },

  navButtonText: {
    fontSize: 18,
    color: '#2E7D32'
  },

  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },

  weekDayText: {
    width: 40,
    textAlign: 'center',
    color: '#666',
    fontWeight: '600'
  },

  calendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  dia: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  diaEmpty: {
    backgroundColor: 'transparent'
  },

  diaSelecionado: {
    backgroundColor: '#2E7D32'
  },

  textoDia: {
    color: '#333',
    fontWeight: '600'
  },

  textoSelecionado: {
    color: '#FFF'
  },

  textoDiaEmpty: {
    color: 'transparent'
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 25,
    marginBottom: 15
  },

  cardHorario: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2
  },

  hora: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  paciente: {
    marginTop: 5,
    color: '#666',
    fontSize: 15
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