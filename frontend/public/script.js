const searchInput = document.querySelector("[data-search]");

let recepti = [];

searchInput.addEventListener('input', e => {
    const value = e.target.value.toLowerCase();
    console.log(recepti);
    recepti.forEach(recept => {
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
    fetch('http://localhost:8080/recept')
        .then(response => response.json())
        .then(data => {
            const recipeList = document.getElementById('recipeList');
            recipeList.innerHTML = '';
            localStorage.setItem('recipes', JSON.stringify(data));

            // gres skozi
            recepti = data.map(recept => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <button type="button" onclick="narediPDF(${recept.id});">Odpri z PDF</button>
                    <button type="button" onclick="izbrisiRecept(${recept.id});">Izbriši</button>
                    <button type="button" onclick="posodobiRecept(${recept.id}, '${recept.naziv}', '${recept.sestavine}', '${recept.potekdela}');">Spremeni</button><br>
                    <h2>${recept.naziv}</h2>
                    Sestavine: ${recept.sestavine}<br><hr>
                    Potek Dela: ${recept.potekdela}
                   
                    
                    <!-- Hidden form -->
                    <form id="updateForm-${recept.id}" class="hide" onsubmit="submitUpdate(${recept.id}, event)">
                        <label>Naziv:</label>
                        <input type="text" id="naziv-${recept.id}" value="${recept.naziv}" required><br>
                        <label>Sestavine:</label>
                        <input type="text" id="sestavine-${recept.id}" value="${recept.sestavine}" required><br>
                        <label>Potek Dela:</label>
                        <input type="text" id="potekdela-${recept.id}" value="${recept.potekdela}" required>
                        <button type="submit">Shrani</button>
                    </form>
                `;
                recipeList.appendChild(listItem);

                return { naziv: recept.naziv, sestavine: recept.sestavine, potekdela: recept.potekdela, element: listItem }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA PDF.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function narediPDF(id) {
        const response = fetch(`http://localhost:5000/recepti/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = response.json();

        console.log(data);

        let nazivpdf = data.naziv;
        let sestavinepdf = data.sestavine;
        let potekDelapdf = data.potekdela;




        let props = {

            nazivpdf: { nazivpdf },
            sestavinepdf: { sestavinepdf },
            potekDelapdf: { potekDelapdf },

            outputType: jsPDFInvoiceTemplate.OutputType.Save,
            returnJsPDFDocObject: true,
            fileName: "Recept za " + nazivpdf,
            orientationLandscape: false,
            compress: true,
            naziv: {
                table: [
                    [
                        { title: data.naziv },
                        { title: data.sestavine },
                        { title: data.potekdela },
                    ],
                ]
            },
            footer: {
                text: "created with jspdf-invoice-template. - Tilen Brunec & Gal Badrov",
            },
            pageEnable: true,
            pageLabel: "Stran ",

        };

        //naredi pdf
        var pdfObject = jsPDFInvoiceTemplate.default(props);
        console.log("Object created:", pdfObject);

}

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA BRISANJE RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/

function izbrisiRecept(id) {
    if (confirm("Ali ste prepričani, da želite izbrisati ta recept?")) {
        fetch(`http://localhost:8080/recept/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert(`Recept z ID-jem ${id} je bil uspešno izbrisan.`);
                    pokaziRecepte(); // osvezissite
                } else {
                    alert('Prišlo je do napake pri brisanju recepta.');
                }
            })
            .catch(error => console.error('Napaka pri brisanju recepta:', error));
    }
}

/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA POSODOBITEV RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function posodobiRecept(id) {
    const form = document.getElementById(`updateForm-${id}`);
    form.classList.toggle('hide'); // skrijes
}

function submitUpdate(id, event) {
    event.preventDefault(); // prekini da se ti se nea enkrat nalozi

    const naziv = document.getElementById(`naziv-${id}`).value;
    const sestavine = document.getElementById(`sestavine-${id}`).value;
    const potekdela = document.getElementById(`potekdela-${id}`).value;

    // PUT
    fetch(`http://localhost:8080/recept/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },



        body: JSON.stringify({ id, naziv, sestavine, potekdela })
    })
        .then(response => {
            if (response.ok) {
                alert(`Recept ${naziv} je bil uspešno posodobljen.`);
                pokaziRecepte(); // obnovi
            } else {
                alert('Prišlo je do napake pri posodabljanju recepta.');
            }
        })
        .catch(error => console.error('Napaka pri posodabljanju recepta:', error));
}
/* … 
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
.........................ZA DODAJANJE RECEPTA.........................
/\//\//\//\//\//\//\//\//\...................................../\//\//\//\//\//\//\//\//\//\//\//\//\//\//\//
*/
function dodajRecept(event) {
    event.preventDefault(); // reces da se ti nena renalozi

    // dobi iz forma podatke
    const naziv = document.getElementById('naziv').value;
    const sestavine = document.getElementById('sestavine').value;
    const potekdela = document.getElementById('potekdela').value;

    // nareis objekt
    const recipe = {
        naziv: naziv,
        sestavine: sestavine,
        potekdela: potekdela
    };

    // POST 
    fetch('http://localhost:8080/recept', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(alert(data.message || `Recept "${data.naziv}" je bil uspešno dodan!`));
            console.log('Success:', data);
            location.reload();// 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Prišlo je do napake pri dodajanju recepta. Prosimo, preverite konzolo za več informacij.');
        });
}