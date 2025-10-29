package QA_Naloga2;

import com.example.demo.Recept;
import com.example.demo.dao.ReceptiRepository;
import com.example.demo.rest.InfoController;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class VsiTestiTest {

    @Mock
    private ReceptiRepository repository;

    @InjectMocks
    private InfoController controller;

    // za vzpostavljanje mockitota --> fake objekti
    private AutoCloseable closeable;
    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }
    @AfterEach
    void tearDown() throws Exception {
        closeable.close();
    }

    // POMOC
    // when --> za simuliranje --> kaj naj mock naredi
    // verify --> preveri ali je mock naredil kaj smo zeleli z when
    // assertX --> preveri resnicnost X besede

    // ==================================================
    // GET /recept
    // ==================================================
    @Test
    void getAllRecept_Positive() {
        Recept r1 = new Recept("Pizza", "Test", "10min");
        when(repository.findAll()).thenReturn(Arrays.asList(r1));

        Iterable<Recept> result = controller.getAllRecept();

        assertTrue(result.iterator().hasNext());
        verify(repository, times(1)).findAll();
    }

    @Test
    void getAllRecept_EdgeEmptyList() {
        when(repository.findAll()).thenReturn(Collections.emptyList());

        Iterable<Recept> result = controller.getAllRecept();

        assertFalse(result.iterator().hasNext());
        verify(repository, times(1)).findAll();
    }

    @Test
    void getAllRecept_NegativeException() {
        when(repository.findAll()).thenThrow(new RuntimeException("DB error"));

        assertThrows(RuntimeException.class, () -> controller.getAllRecept());
    }

    // ==================================================
    // GET /recept/{id}
    // ==================================================
    @Test
    void getReceptById_Positive() {
        Recept r = new Recept("Pizza", "Test", "10min");
        when(repository.findById(1)).thenReturn(Optional.of(r));

        Optional<Recept> result = controller.getReceptById(1);

        assertTrue(result.isPresent());
        assertEquals("Pizza", result.get().getNaziv());
        verify(repository, times(1)).findById(1);
    }

    @Test
    void getReceptById_EdgeNotFound() {
        when(repository.findById(999)).thenReturn(Optional.empty());

        Optional<Recept> result = controller.getReceptById(999);

        assertFalse(result.isPresent());
        verify(repository, times(1)).findById(999);
    }

    @Test
    void getReceptById_NegativeException() {
        when(repository.findById(1)).thenThrow(new RuntimeException("DB error"));

        assertThrows(RuntimeException.class, () -> controller.getReceptById(1));
    }

    // ==================================================
    // DELETE /recept/{id}
    // ==================================================
    @Test
    void deleteRecept_Positive() {
        when(repository.existsById(1)).thenReturn(true);
        doNothing().when(repository).deleteById(1);

        ResponseEntity<String> response = controller.deleteRecept(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().contains("uspešno izbrisan"));
        verify(repository, times(1)).deleteById(1);
    }

    @Test
    void deleteRecept_EdgeNotExists() {
        when(repository.existsById(999)).thenReturn(false);

        ResponseEntity<String> response = controller.deleteRecept(999);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertTrue(response.getBody().contains("ne obstaja"));
    }

    @Test
    void deleteRecept_NegativeException() {
        when(repository.existsById(1)).thenReturn(true);
        doThrow(new RuntimeException("DB error")).when(repository).deleteById(1);

        assertThrows(RuntimeException.class, () -> controller.deleteRecept(1));
    }

    // ==================================================
    // PUT /recept/{id}
    // ==================================================
    @Test
    void patchRecept_Positive() {
        Recept r = new Recept("Pasta", "Test", "20min");
        when(repository.existsById(1)).thenReturn(true);
        when(repository.save(r)).thenReturn(r);

        ResponseEntity<Recept> response = controller.putRecept(1, r);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(r, response.getBody());
    }

    @Test
    void patchRecept_EdgeNotExists() {
        Recept r = new Recept("Pasta", "Test", "20min");
        when(repository.existsById(999)).thenReturn(false);

        ResponseEntity<Recept> response = controller.putRecept(999, r);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void patchRecept_NegativeException() {
        Recept r = new Recept("Pasta", "Test", "20min");
        when(repository.existsById(1)).thenReturn(true);
        when(repository.save(r)).thenThrow(new RuntimeException("DB error"));

        assertThrows(RuntimeException.class, () -> controller.putRecept(1, r));
    }

    // ==================================================
    // POST /recept
    // ==================================================
    @Test
    void createRecept_Positive() {
        Recept r = new Recept("Burger", "Test desc", "15min");
        when(repository.save(r)).thenReturn(r);

        Recept result = controller.postRecept(r);

        assertNotNull(result);
        assertEquals("Burger", result.getNaziv());
        verify(repository, times(1)).save(r);
    }

    @Test
    void createRecept_EdgeEmptyFields() {
        Recept r = new Recept("", "", "");
        when(repository.save(r)).thenReturn(r);

        Recept result = controller.postRecept(r);

        assertEquals("", result.getNaziv());
        verify(repository, times(1)).save(r);
    }

    @Test
    void createRecept_NegativeException() {
        Recept r = new Recept("Burger", "Test", "15min");
        when(repository.save(r)).thenThrow(new RuntimeException("DB error"));

        assertThrows(RuntimeException.class, () -> controller.postRecept(r));
    }
}