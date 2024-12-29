package vao;

import com.example.demo.Recept;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class TestEnakostReceptov {



        @Test
        void testStaEnaka() {
            Recept r1 = new Recept("Čokoladni kolač", "Čokolada, moka, jajca", "Mešanje, peka");
            Recept r2 = new Recept("Čokoladni kolač", "Čokolada, moka, jajca", "Mešanje, peka");
            Assertions.assertTrue(r1.staEnaka(r2)); // Oba recepta imata isti naziv
        }
/*
        @Test
        void testStaEnakaMaleVlke() {
            Recept r1 = new Recept("Čokoladni kolač", "Čokolada, moka, jajca", "Mešanje, peka");
            Recept r2 = new Recept("čokoladni kolač", "Čokolada, moka, jajca", "Mešanje, peka");
            Assertions.assertTrue(r1.staEnaka(r2)); // Oba recepta imata isti naziv z različnimi črkami
        }

        @Test
        void testStaEnakaDifferentNames() {
            Recept r1 = new Recept("Čokoladni kolač", "Čokolada, moka, jajca", "Mešanje, peka");
            Recept r2 = new Recept("Vanilijev kolač", "Vanilija, moka, jajca", "Mešanje, peka");
            Assertions.assertFalse(r1.staEnaka(r2)); // Recepta imata različna naziva
        }

        @Test
        void testStaEnakaPosebniChar() {
            Recept r1 = new Recept("Pecivo z vanilijo", "Vanilija, moka, jajca", "Mešanje, peka");
            Recept r2 = new Recept("Pecivo z vanilíjo", "Vanilija, moka, jajca", "Mešanje, peka");
            Assertions.assertFalse(r1.staEnaka(r2)); // Različna posebna znaka (i in í)
        }
        @Test
        void testStaEnakaPosebniChar2() {
            Recept r1 = new Recept("Pecivo z vanilijo", "Vanilija, moka, jajca", "Mešanje, peka");
            Recept r2 = new Recept("Pecivo z vanilijo", "Vänilija, moka, jajca", "Mešanje, peka");
            Assertions.assertFalse(r1.staEnaka(r2)); // Različna posebna znaka (a in a)
        }
*/
    }

