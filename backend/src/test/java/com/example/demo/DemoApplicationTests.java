package com.example.demo;

import com.example.demo.dao.ReceptiRepository;
import com.example.demo.rest.InfoController;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Repeat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import static org.mockito.Mockito.when;

@SpringBootTest
class DemoApplicationTests {

	@Autowired
	ReceptiRepository repository;
	@Autowired
	InfoController controller;
	@Autowired
	private InfoController receptiController;


	//izbrise nam repository vrednosti pred vsakim zagnanim testom
	@Test
	@BeforeEach
	void init() {
		repository.deleteAll();
		Assertions.assertEquals(0, repository.count());
	}

	// preveri ali se ustvarjen recept ustrezno shrani v repository
	@RepeatedTest(5)
	void postReceptTest() {
		Assertions.assertEquals(0,repository.count());
		Recept recept1 = new Recept("Wafli", "cuker","peci");
		repository.save(recept1);
		Assertions.assertEquals(1,repository.count());
	}


	// preverimo ali se dodan objekt v repository ustrezno tudi izbrise iz repositoryja
	@Test
	void deleteReceptTest() {
		Assertions.assertEquals(0,repository.count());
		Recept r = new Recept( "burek","meso","kucaj");
		repository.save(r);
		repository.deleteAll();
		Assertions.assertEquals(0,repository.count());
	}

	//negativni scenarij
	@Test
	void deleteReceptTest2() {
		Assertions.assertEquals(0,repository.count());
		Recept r = new Recept( "burek","meso","kucaj");
		repository.save(r);
		repository.deleteAll();
		Assertions.assertEquals(1,repository.count());
	}

	//preverimo spreminjanje podatkov v ze obstojecih primerih receptov
	@Test

	void putReceptTest() {
		// Preverimo, da je baza prazna
		Assertions.assertEquals(0, repository.count());

		// Dodamo recept v bazo
		Recept r = new Recept("burek", "meso", "peci");
		repository.save(r);

		// Preverimo, da je bil recept uspešno shranjen
		Assertions.assertEquals(1, repository.count());

		// Posodobimo podatke recepta
		Recept updatedRecept = new Recept("Sirni burek", "sir", "peci");
		updatedRecept.setId(r.getId()); // Nastavimo isti ID

		// Pokličemo posodobitveno metodo
		repository.save(updatedRecept);

		// Pridobimo posodobljen recept iz baze
		Recept result = repository.findById(r.getId()).orElse(null);

		// Preverimo, ali so podatki pravilno posodobljeni
		Assertions.assertNotNull(result);
		Assertions.assertEquals("Sirni burek", result.getNaziv());
		Assertions.assertEquals("sir", result.getSestavine());
		Assertions.assertEquals("peci", result.getPotekdela());

		// Preverimo, da je število receptov v bazi še vedno 1
		Assertions.assertEquals(1, repository.count());
	}

	//negativni scenarij
	@Test
	void putReceptTest2() {
		// Preverimo, da je baza prazna
		Assertions.assertEquals(0, repository.count());

		// Dodamo recept v bazo
		Recept r = new Recept("burek", "meso", "peci");
		repository.save(r);

		// Preverimo, da je bil recept uspešno shranjen
		Assertions.assertEquals(1, repository.count());

		// Posodobimo podatke recepta
		Recept updatedRecept = new Recept("Sirni burek", "sir", "peci");
		updatedRecept.setId(r.getId()); // Nastavimo isti ID

		// Pokličemo posodobitveno metodo
		repository.save(updatedRecept);

		// Pridobimo posodobljen recept iz baze
		Recept result = repository.findById(r.getId()).orElse(null);

		// Preverimo, ali so podatki pravilno posodobljeni
		Assertions.assertNotNull(result);
		Assertions.assertEquals("mesni burek", result.getNaziv());
		Assertions.assertEquals("meso", result.getSestavine());
		Assertions.assertEquals("peci", result.getPotekdela());

		// Preverimo, da je število receptov v bazi še vedno 1
		Assertions.assertEquals(1, repository.count());
	}

}
