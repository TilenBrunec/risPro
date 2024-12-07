package com.example.demo;

import jakarta.persistence.*;
import lombok.Data;

import java.text.Normalizer;
import java.util.regex.Pattern;


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

    public Recept(int id, String naziv, String sestavine, String potekdela ) {
        this.id = id;
        this.naziv = naziv;
        this.sestavine = sestavine;
        this.potekdela = potekdela;

    }

    public boolean staEnaka(Recept other) {
        if (other == null || this.naziv == null || other.naziv == null) {
            return false;
        }
        String naziv1 = normalize(this.naziv);
        String naziv2 = normalize(other.naziv);
        return naziv1.equalsIgnoreCase(naziv2);
    }

    private String normalize(String input) {
        // Normalizacija stringa in odstranitev diakritičnih znakov
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("")
                .replace("Đ", "D").replace("đ", "d");
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