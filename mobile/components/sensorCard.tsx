import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Sensor } from "@/models/sensor";
import { COLORS } from "@/constants/colors";
import { Pencil, Trash2 } from "lucide-react-native";

interface SensorCardProps {
  sensor: Sensor;
  onPress?: () => void;
  onEdit: (sensor: Sensor) => void;
  onDelete: (id: number) => void;
}

export function SensorCard({ sensor, onPress, onEdit, onDelete }: SensorCardProps) {
  const handleDelete = () => {
    Alert.alert(
      "Deletar Sensor",
      `Tem certeza que deseja excluir "${sensor.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", style: "destructive", onPress: () => onDelete(sensor.id) },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{sensor.name}</Text>
        <Text style={styles.value}>
          {sensor.type} - {sensor.value}
        </Text>
        <Text style={styles.status}>Status: {sensor.status}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(sensor)} style={styles.iconButton}>
          <Pencil size={18} color={COLORS.info} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
          <Trash2 size={18} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  value: { fontSize: 14, color: COLORS.textSecondary },
  status: { fontSize: 14, color: COLORS.info },
  actions: { flexDirection: "row", gap: 8 },
  iconButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginLeft: 6,
  },
});
