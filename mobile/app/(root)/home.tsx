import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';
import { COLORS } from '@/constants/colors';
import sensorsMock from '@/mocks/sensors.json';
import { Sensor } from '@/models/sensor';
import { StatCard } from '@/components/statCard';
import { SensorCard } from '@/components/sensorCard';

export default function HomeScreen() {
  const [sensors, setSensors] = useState<Sensor[]>(sensorsMock);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setSensors(sensorsMock);
      setRefreshing(false);
    }, 2000);
  };

  const statusCounts = sensors.reduce((acc, sensor) => {
    acc[sensor.status] = (acc[sensor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const renderItem = ({ item }: { item: Sensor }) => (
    <SensorCard
      sensor={item}
      onPress={() => alert(`Detalhes do ${item.name} - Em desenvolvimento`)}
    />
  );

  const statsData = [
    { title: "Normais", count: statusCounts.OK || 0, color: COLORS.success },
    { title: "Alertas", count: statusCounts.Alerta || 0, color: COLORS.warning },
    { title: "Avisos", count: statusCounts.Aviso || 0, color: COLORS.info },
    { title: "Erros", count: statusCounts.Erro || 0, color: COLORS.error },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Text style={styles.title}>Digital Twin</Text>
        <Text style={styles.subtitle}>Monitoramento em Tempo Real</Text>
      </View>

      <View style={styles.statsContainer}>
        {statsData.map(({ title, count, color }) => (
          <StatCard key={title} title={title} count={count} color={color} />
        ))}
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Sensores Ativos</Text>
        <FlatList
          data={sensors}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.backgroundSecondary,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },

  listContent: {
    paddingBottom: 20,
  },

  separator: {
    height: 12,
  },
});
