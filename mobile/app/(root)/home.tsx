import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "@/constants/colors";
import { StatCard } from "@/components/statCard";
import { SensorCard } from "@/components/sensorCard";
import api from "@/services/api";
import { RefreshCcw, Plus } from "lucide-react-native";
import SensorModal from "@/components/SensorModal";
import { Sensor } from "@/models/sensor";

export default function HomeScreen() {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSensor, setEditingSensor] = useState<Sensor | null>(null);

  const fetchSensors = async () => {
    try {
      if (!refreshing) setLoading(true);

      const res = await api.get<Sensor[]>("/readings");
      setSensors(res.data);
    } catch (err) {
      console.error("Erro ao buscar sensores:", err);
      Alert.alert("Erro", "Não foi possível carregar os sensores.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  const statusCounts = sensors.reduce((acc, sensor) => {
    acc[sensor.status] = (acc[sensor.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statsData = [
    { title: "Normais", count: statusCounts.OK || 0, color: COLORS.success },
    { title: "Alertas", count: statusCounts.Alerta || 0, color: COLORS.warning },
    { title: "Avisos", count: statusCounts.Aviso || 0, color: COLORS.info },
    { title: "Erros", count: statusCounts.Erro || 0, color: COLORS.error },
  ];

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.text} />
        <Text style={{ color: COLORS.text, marginTop: 8 }}>
          Carregando sensores...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Digital Twin</Text>
          <Text style={styles.subtitle}>Monitoramento em Tempo Real</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={fetchSensors} style={styles.iconButton}>
            <RefreshCcw size={22} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconButton}
          >
            <Plus size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>
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
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <SensorCard
              sensor={item}
              onPress={() =>
                Alert.alert("Detalhes", `Sensor: ${item.name}`)
              }
              onEdit={(sensor) => setEditingSensor(sensor)}
              onDelete={async (id) => {
                try {
                  await api.delete(`/readings/${id}`);
                  setSensors((prev) => prev.filter((s) => s.id !== id));
                  Alert.alert("Sucesso", "Sensor deletado.");
                } catch (err) {
                  console.error("Erro ao deletar:", err);
                  Alert.alert("Erro", "Não foi possível deletar.");
                }
              }}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchSensors();
          }}
        />
      </View>

      <SensorModal
          visible={modalVisible || !!editingSensor}
        onClose={() => {
          setModalVisible(false);
          setEditingSensor(null);
        }}
        initialData={editingSensor}
        onSave={async (sensorData) => {
          if (editingSensor) {
            // Atualizar
            try {
              const res = await api.put(
                `/readings/${editingSensor.id}`,
                sensorData
              );
              setSensors((prev) =>
                prev.map((s) =>
                  s.id === editingSensor.id ? res.data : s
                )
              );
              Alert.alert("Sucesso", "Sensor atualizado.");
            } catch (err) {
              console.error("Erro ao atualizar:", err);
              Alert.alert("Erro", "Não foi possível atualizar.");
            } finally {
              setEditingSensor(null);
            }
          } else {
            // Criar
            try {
              const res = await api.post("/readings", sensorData);
              setSensors((prev) => [...prev, res.data]);
              Alert.alert("Sucesso", "Sensor criado!");
            } catch (err) {
              console.error("Erro ao criar:", err);
              Alert.alert("Erro", "Não foi possível criar o sensor.");
            } finally {
              setModalVisible(false);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.backgroundSecondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: { flexDirection: "row", gap: 12 },
  iconButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: { fontSize: 16, color: COLORS.textSecondary },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  listContainer: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 16,
  },
});
