package com.example.demo.dao;

import org.springframework.data.repository.CrudRepository;
import com.example.demo.Recept;
import org.springframework.stereotype.Repository;


public interface ReceptiRepository extends CrudRepository<Recept, Integer> {

}
