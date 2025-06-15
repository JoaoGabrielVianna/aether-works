package com.aether_works.project.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.aether_works.project.models.SensorModel;
import com.aether_works.project.services.SensorService;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*")
public class SensorController {

    private static final Logger logger = LoggerFactory.getLogger(SensorController.class);

    @Autowired
    private SensorService service;

    @PostMapping
    public ResponseEntity<SensorModel> create(@RequestBody SensorModel obj) {
        logger.info("POST /sensors - Criando sensor: {}", obj);
        SensorModel created = service.create(obj);
        logger.info("Sensor criado com ID: {}", created.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        logger.info("DELETE /sensors/{} - Deletando sensor", id);
        service.delete(id);
        logger.info("Sensor deletado: {}", id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SensorModel> getId(@PathVariable Long id) {
        logger.info("GET /sensors/{} - Buscando sensor", id);
        SensorModel sensor = service.getById(id);
        logger.info("Sensor encontrado: {}", sensor);
        return ResponseEntity.ok().body(sensor);
    }

    @GetMapping
    public ResponseEntity<List<SensorModel>> getAll() {
        logger.info("GET /sensors - Buscando todos os sensores");
        List<SensorModel> sensors = service.getAll();
        logger.info("Total de sensores encontrados: {}", sensors.size());
        return ResponseEntity.ok().body(sensors);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SensorModel> update(@PathVariable Long id, @RequestBody SensorModel obj) {
        logger.info("PUT /sensors/{} - Atualizando sensor: {}", id, obj);
        obj.setId(id);
        SensorModel updated = service.update(obj);
        logger.info("Sensor atualizado: {}", updated);
        return ResponseEntity.ok().body(updated);
    }
}
