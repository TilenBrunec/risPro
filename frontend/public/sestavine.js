function prikaziSestavine() {
    const VseSest = sessionStorage.getItem("sestavine");
    
    console.log(VseSest);
    

    if (VseSest) {
        // Match all parts after the second dash in each segment
        const sestavineList = VseSest.split(",").map(item => {
            const match = item.match(/(?:[^-]*-){2}(.+)/); // Match everything after the second dash
            return match ? match[1].trim() : ""; // Extract the captured group and trim whitespace
        });

        // Count occurrences of each ingredient using a map or object
        const countMap = sestavineList.reduce((acc, sestavina) => {
            acc[sestavina] = (acc[sestavina] || 0) + 1;
            return acc;
        }, {});

        // Sort ingredients by count in descending order
        const sortedIngredients = Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);

        // za izpis v vsako vrstico
        const sestavineOutput = sortedIngredients.map(sestavina => {
            return `${countMap[sestavina]} ${sestavina}<br>`;
        }).join('');

        // za sesion storage
        const sestavinestorage = sortedIngredients.map(sestavina => {
            return `${countMap[sestavina]} ${sestavina}, `;
        }).join('');
        
        sessionStorage.setItem("najpogosteSestavine", sestavinestorage)
        const izpis = document.getElementById("vseSestavine");
        izpis.innerHTML = sestavineOutput;
    } else {
       
        document.getElementById("vseSestavine").innerHTML = "No ingredients found";
    }
}

function prikaziNajRecept() {
    const najSestavine = sessionStorage.getItem("najpogosteSestavine");
    
    console.log(najSestavine);

    // Regularni izraz, ki ujame prvo besedo (sestavino)
    const najPopularnejsaSestavina = najSestavine.match(/^\d+\s(\w+|\w+-\w+)/);
    const sestavina = najPopularnejsaSestavina ? najPopularnejsaSestavina[1] : ""; // Prva beseda v seznamu sestavin

    console.log("Najbolj popularna sestavina: " + sestavina);

    const izpisNajSestavin = document.getElementById("najsestavine");
    izpisNajSestavin.innerHTML = `Najbolj priljubljena sestavina je: ${sestavina}`;

    fetch("http://localhost:8080/recept")
    .then((response) => response.json())
    .then((data) => {
        const recipeList = document.getElementById("najRecept");
        recipeList.innerHTML = "";

        const filteredRecipes = data.filter((recept) => {
            return recept.sestavine.includes(sestavina); // filtriraj recepte, ki vsebujejo najpopularnejšo sestavino
        });

        filteredRecipes.forEach((recept) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <h2>${recept.naziv}</h2>
                <b> Sestavine:</b> ${recept.sestavine}<br><hr>
                <b> Potek Dela:</b> ${recept.potekdela}<br><hr>
            `;
            recipeList.appendChild(listItem);
        });

        if (filteredRecipes.length === 0) {
            recipeList.innerHTML = "<li>Ni receptov, ki vsebujejo najpogostejšo sestavino.</li>";
        }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
