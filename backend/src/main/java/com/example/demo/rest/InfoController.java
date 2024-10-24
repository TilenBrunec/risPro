package com.example.demo.rest;

import com.example.demo.dao.ReceptiRepository;
import com.example.demo.vao.Recept;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin
@RestController
public class InfoController {

    Logger logger = Logger.getLogger(InfoController.class.getName());

    @Autowired
    ReceptiRepository repository;


    @GetMapping("/info")
    public String pozdravi() {
        return "Zdravo";
    }

    @GetMapping("/recept")
    public Iterable<Recept> getAllRecept(){
        logger.info("Getting all Oseba data");
        return repository.findAll();
    }


    @GetMapping("/recept/{id}")
    public Optional<Recept> getReceptById(@PathParam("id") int id){
        logger.info("Get Oseba by id: " + id);
        return repository.findById(id);
    }

    @DeleteMapping("/recept/{id}")
    public ResponseEntity<String> deleteRecept(@PathVariable int id) {
        logger.info("Deleting Recept with id: " + id);

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok("Recept z ID-jem " + id + " je bil uspešno izbrisan.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recept z ID-jem " + id + " ne obstaja.");
        }
    }

    @PutMapping("/recept/{id}")
    public ResponseEntity<Recept> putRecept(@PathVariable int id, @RequestBody Recept recept) {

        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        recept.setId(id); // de je receptan pravi id
        Recept updatedRecept = repository.save(recept); // shrani recept

        return ResponseEntity.ok(updatedRecept); // vrni posodoblen recept
    }


    @PostMapping("/recept")
    public Recept postRecept(@RequestBody Recept recept) {
        logger.info("Post Recept " + recept);
        Recept newRecept = new Recept(recept.getNaziv(), recept.getSestavine(), recept.getPotekdela());
        repository.save(newRecept);
        return newRecept;
    }
}
