package com.example.demo.vao;

import jakarta.persistence.*;
import lombok.Data;



@Data
@Entity
public class Recept {

    private String naziv;
    private String sestavine;
    private String potekdela;

    @Id
    @GeneratedValue
    private int id;

    public Recept(String naziv, String sestavine, String potekdela ) {
        this.naziv = naziv;
        this.sestavine = sestavine;
        this.potekdela = potekdela;

    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getSestavine() {
        return sestavine;
    }

    public void setSestavine(String sestavine) {
        this.sestavine = sestavine;
    }

    public String getPotekdela() {
        return potekdela;
    }

    public void setPotekdela(String potekdela) {
        this.potekdela = potekdela;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Recept() {
    }


}