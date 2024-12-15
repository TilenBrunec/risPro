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
