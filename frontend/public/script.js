const searchInput = document.querySelector("[data-search]");

let recepti = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(recepti);
  recepti.forEach((recept) => {
    const jevidna = recept.naziv.toLowerCase().includes(value);
    recept.element.classList.toggle("hide", !jevidna);
    console.log(recept);
  });
});

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................DA DOBIS VSE PODATKE.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function pokaziRecepte() {
  fetch("http://localhost:8080/recept")
    .then((response) => response.json())
    .then((data) => {
      const recipeList = document.getElementById("recipeList");
      recipeList.innerHTML = "";
      localStorage.setItem("recipes", JSON.stringify(data));

      recepti = data.map((recept) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
                    <button type="button" onclick="narediPDF(${recept.id});">Odpri z PDF</button>
                    <button type="button" onclick="izbrisiRecept(${recept.id});">Izbriši</button>
                    <button type="button" onclick="posodobiRecept(${recept.id}, '${recept.naziv}', '${recept.sestavine}', '${recept.potekdela}');">Spremeni</button><br>
                    <h2>${recept.naziv}</h2>
                   <b> Sestavine:</b> ${recept.sestavine}<br><hr>
                    <b> Potek Dela:</b> ${recept.potekdela}<br><hr>
                    Stevilo porcij: <input type="number" id="stevilo_porcij-${recept.id}" min="1" value="1"></input>
                    <button onclick="posodobiReceptPorcija('${recept.sestavine}', ${recept.id})">Racunaj</button><br>
                    Posodobljena kolicina sestavin: <div id="nove_kolicine-${recept.id}"></div>
                `;
        recipeList.appendChild(listItem);

        return {
          id: recept.id,
          naziv: recept.naziv,
          sestavine: recept.sestavine,
          potekdela: recept.potekdela,
        };
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function posodobiReceptPorcija(sestavine, id) {
  const stPorcij = document.getElementById(`stevilo_porcij-${id}`).value; // da kao dobis st porci
  if (stPorcij) {
    
    const modifiedString = sestavine.replace(/\d+/g, (match) => Number(match) * stPorcij); //regularni izraz za stringe za posodobitev
    console.log("Modified Ingredients:", modifiedString);

    
    document.getElementById(`nove_kolicine-${id}`).innerHTML = modifiedString; // posodobi
  } else {
    alert("Prosim vnesite število porcij!");
  }
}


/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA PDF.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/

async function narediPDF(id) {
    try {
        // Fetch the recipe data
        const response = await fetch(`http://localhost:5000/recepti/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const dataArray = await response.json();
        console.log("Fetched data array:", dataArray);

        // Check if the array is valid and contains data
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            throw new Error("No recipe data found for the given ID.");
        }

        // Extract the recipe object (assuming single entry in array)
        const data = dataArray[0];
        console.log("Extracted recipe object:", data);

        // Import jsPDF
        const { jsPDF } = window.jspdf;

        // Create a new PDF document
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.text("Recept", 10, 10);

        // Add Recipe Name
        doc.setFontSize(14);
        doc.text(`Naziv: ${data.naziv}`, 10, 20);

        // Add Ingredients
        doc.setFontSize(12);
        doc.text("Sestavine:", 10, 30);
        doc.text(data.sestavine, 20, 40);

        // Add Preparation Steps
        doc.text("Potek dela:", 10, 60);
        doc.text(data.potekdela, 20, 70);

        // Save the PDF with the recipe name
        doc.save(`Recept_${data.naziv}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA BRISANJE RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/

function izbrisiRecept(id) {
  if (confirm("Ali ste prepričani, da želite izbrisati ta recept?")) {
    fetch(`http://localhost:8080/recept/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert(`Recept z ID-jem ${id} je bil uspešno izbrisan.`);
          pokaziRecepte(); // osvezissite
        } else {
          alert("Prišlo je do napake pri brisanju recepta.");
        }
      })
      .catch((error) => console.error("Napaka pri brisanju recepta:", error));
  }
}

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA POSODOBITEV RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function posodobiRecept(id) {
  const form = document.getElementById(`updateForm-${id}`);
  form.classList.toggle("hide"); // skrijes
}

function submitUpdate(id, event) {
  event.preventDefault(); // prekini da se ti se nea enkrat nalozi

  const naziv = document.getElementById(`naziv-${id}`).value;
  const sestavine = document.getElementById(`sestavine-${id}`).value;
  const potekdela = document.getElementById(`potekdela-${id}`).value;

  // PUT
  fetch(`http://localhost:8080/recept/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ id, naziv, sestavine, potekdela }),
  })
    .then((response) => {
      if (response.ok) {
        alert(`Recept ${naziv} je bil uspešno posodobljen.`);
        pokaziRecepte(); // obnovi
      } else {
        alert("Prišlo je do napake pri posodabljanju recepta.");
      }
    })
    .catch((error) =>
      console.error("Napaka pri posodabljanju recepta:", error)
    );
}
/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA DODAJANJE RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function dodajRecept(event) {
  event.preventDefault(); // reces da se ti nena renalozi

  // dobi iz forma podatke
  const naziv = document.getElementById("naziv").value;
  const sestavine = document.getElementById("sestavine").value;
  const potekdela = document.getElementById("potekdela").value;

  // nareis objekt
  const recipe = {
    naziv: naziv,
    sestavine: sestavine,
    potekdela: potekdela,
  };

  // POST
  fetch("http://localhost:8080/recept", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(
        alert(data.message || `Recept "${data.naziv}" je bil uspešno dodan!`)
      );
      console.log("Success:", data);
      location.reload(); //
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Prišlo je do napake pri dodajanju recepta. Prosimo, preverite konzolo za več informacij."
      );
    });
}
