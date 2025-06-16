package com.aether_works.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aether_works.project.models.SensorModel;
import com.aether_works.project.repository.SensorRepository;

@Service
public class SensorService {
    @Autowired
    private SensorRepository repository;

    public SensorModel create(SensorModel obj){
        return repository.save(obj);
    }

    public void delete(Long id){
        repository.deleteById(id);;
    }

    public SensorModel getById(Long id){
        Optional<SensorModel> obj = repository.findById(id);
        return obj.get();
    }

    public List<SensorModel> getAll(){
        return repository.findAll();
    }

    public SensorModel update(SensorModel obj){
        Optional<SensorModel> newObj = repository.findById(obj.getId());
        updateSensor(newObj, obj);
        return repository.save(newObj.get());
     
    }

    private void updateSensor(Optional<SensorModel> newObj, SensorModel obj){
        newObj.get().setName(obj.getName());
        newObj.get().setType(obj.getType());
        newObj.get().setValue(obj.getValue());
        newObj.get().setStatus(obj.getStatus());
        newObj.get().setIcon(obj.getIcon());
    }
    
}
