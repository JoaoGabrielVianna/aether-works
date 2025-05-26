import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, getStatusColor } from '@/constants/colors';
import { Sensor } from '@/models/sensor';

type SensorCardProps = {
  sensor: Sensor;
  onPress?: () => void;
};

export function SensorCard({ sensor, onPress }: SensorCardProps) {
  const statusColors = getStatusColor(sensor.status);

  return (
    <TouchableOpacity 
      style={styles.sensorCard} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Header do card */}
      <View style={styles.cardHeader}>
        <View style={styles.sensorInfo}>
          <Text style={styles.sensorIcon}>{sensor.icon}</Text>
          <View style={styles.sensorDetails}>
            <Text style={styles.sensorName} numberOfLines={1}>
              {sensor.name}
            </Text>
            <Text style={styles.sensorId}>ID: {sensor.id}</Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: statusColors.background }]}>
          <Text style={[styles.statusText, { color: statusColors.text }]}>
            {sensor.status}
          </Text>
        </View>
      </View>

      {/* Valor do sensor */}
      <View style={styles.valueContainer}>
        <Text style={styles.valueLabel}>Valor Atual</Text>
        <View style={styles.valueWrapper}>
          <Text style={styles.sensorValue}>
            {sensor.value}
          </Text>
        </View>
      </View>

      {/* Indicador visual */}
      <View style={[styles.cardIndicator, { backgroundColor: statusColors.background }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sensorCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sensorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  sensorIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sensorDetails: {
    flex: 1,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  sensorId: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  valueContainer: {
    marginTop: 8,
  },
  valueLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  sensorValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
});
