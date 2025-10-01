import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "@/constants/colors";
import { Sensor } from "@/models/sensor";

interface SensorModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (sensor: {
    name: string;
    type: string;
    sensorValue: string;
    status: string;
    icon: string;
  }) => void;
  initialData?: Sensor | null;
}

export default function SensorModal({
  visible,
  onClose,
  onSave,
  initialData,
}: SensorModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [sensorValue, setSensorValue] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setType(initialData.type);
      setSensorValue(initialData.value);
      setStatus(initialData.status);
      setIcon(initialData.icon);
    } else {
      setName("");
      setType("");
      setSensorValue("");
      setStatus("");
      setIcon("");
    }
  }, [initialData, visible]);

  const handleSave = () => {
    if (!name || !type || !sensorValue || !status) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    onSave({ name, type, sensorValue, status, icon });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {initialData ? "Editar Sensor" : "Novo Sensor"}
          </Text>

          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Tipo"
            value={type}
            onChangeText={setType}
            style={styles.input}
          />
          <TextInput
            placeholder="Valor"
            value={sensorValue}
            onChangeText={setSensorValue}
            style={styles.input}
          />
          <TextInput
            placeholder="Status (OK, Aviso, Alerta, Erro)"
            value={status}
            onChangeText={setStatus}
            style={styles.input}
          />
          <TextInput
            placeholder="Ícone (opcional)"
            value={icon}
            onChangeText={setIcon}
            style={styles.input}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: COLORS.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  cancelButton: { marginRight: 16 },
  cancelText: { color: COLORS.error, fontSize: 16 },
  saveButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveText: { color: "#fff", fontWeight: "600" },
});
