 # RIS PROJECT BRUNEC TILEN, BADROV GAL

## Project Setup Guide

This project includes two backends: one using Java Spring Boot and the other using Node.js (Express). Both connect to a MySQL database named recepti. The project is developed using:

IntelliJ IDEA Ultimate
Visual Studio Code
XAMPP phpMyAdmin for database management.

## Vision
This recipe web application aims to provide a user-friendly platform for discovering, adding, and managing recipes, combining a Java Spring Boot backend for data stability with a Node.js (Express) backend for responsive performance. The platform is designed to offer seamless access to a growing recipe collection, ensuring an intuitive experience across all devices.

## Prerequisites

Java Development Kit (JDK) – Java 21 or higher https://www.oracle.com/java/technologies/downloads/

Node.js and npm https://nodejs.org/en/download/package-manager

IntelliJ IDEA Ultimate https://www.jetbrains.com/idea/download/?source=google&medium=cpc&campaign=EMEA_en_EAST_IDEA_Branded&term=intellij+idea&content=693349187757&gad_source=1&gclid=Cj0KCQjwpvK4BhDUARIsADHt9sRGGZpZoyrK6ylV6hP31sc8qfPXGP8vVOregBxan3e3Q0AGOmvTz5EaArdMEALw_wcB&section=windows

Visual Studio Code https://code.visualstudio.com/download

XAMPP for MySQL and phpMyAdmin https://www.apachefriends.org/download.html

Git (optional, for version control) https://git-scm.com/downloads

Steps to Set Up the Project

# HOW TO CREATE THE PROJECT

## 1. Clone the Repository

Create a folder where you'll run Git Bash.
In Git Bash, navigate to this folder and use the command below:
Copy the code:
bash
git clone https://github.com/TilenBrunec/risPro.git

## 2. Database Setup in XAMPP

After installing XAMPP, open the XAMPP control panel and start the Apache and MySQL services.
Open phpMyAdmin in your browser by going to http://localhost/phpmyadmin.
Create a new database called recepti.
Run the following SQL code to set up the recept table in the recepti database:
sql
Copy the code:

`` CREATE DATABASE `recepti`;

USE `recepti`;

CREATE TABLE recept (
  id INT AUTO_INCREMENT PRIMARY KEY,
  naziv VARCHAR(255) NOT NULL,
  sestavine VARCHAR(255) NOT NULL,
  potekdela VARCHAR(255) NOT NULL
); ``

You can also insert some random data.
Run the following SQL code to insert data in recept table in the recepti database:
sql
Copy the code:

INSERT INTO recept (naziv, sestavine, potekdela) VALUES 
('Spaghetti Carbonara', 'spaghetti, pancetta, eggs, Parmesan, black pepper', 'Boil spaghetti, cook pancetta, mix eggs with cheese, combine everything and serve.'),
('Chicken Curry', 'chicken, curry powder, coconut milk, onions, garlic, ginger', 'Saute onions, garlic, ginger; add chicken and curry powder; pour in coconut milk and simmer.'),
('Caesar Salad', 'lettuce, chicken breast, croutons, Parmesan, Caesar dressing', 'Grill chicken, mix lettuce with dressing, add chicken and croutons, sprinkle Parmesan.'),
('Beef Tacos', 'ground beef, taco seasoning, tortillas, lettuce, cheese, salsa', 'Cook beef with seasoning, warm tortillas, assemble with lettuce, cheese, and salsa.'),
('Tomato Soup', 'tomatoes, onions, garlic, olive oil, basil, cream', 'Saute onions and garlic, add tomatoes and basil, blend and add cream before serving.'),
('Grilled Cheese Sandwich', 'bread, cheese, butter', 'Butter bread, add cheese, grill both sides until cheese melts.'),
('Apple Pie', 'apples, flour, butter, sugar, cinnamon', 'Prepare dough, fill with apples and cinnamon, bake until golden brown.');


## 3. Java Spring Boot Backend Setup

Open IntelliJ IDEA Ultimate and navigate to the backend-springboot folder inside the project directory.
In src/main/resources, open application.properties and add your MySQL credentials as follows:
properties
Copy the code:

spring.datasource.url=jdbc:mysql://localhost:3306/recepti           //spring.datasource.url=jdbc:mysql://localhost:[your sql port]/recepti   
spring.datasource.username=your_mysql_username                      // replace with 'root'
spring.datasource.password=your_mysql_password                      // if you don't have a password, just delete this line
spring.jpa.hibernate.ddl-auto=update

To start the Spring Boot application:
Open the main class file (e.g., DemoApplication.java) in IntelliJ.
Run the application by clicking Run.

The Spring Boot backend will start on http://localhost:8080 by default.

All you need to do now is to connect this backend to database by clicking de database icon in top right in your IntelliJ.
Then you press button where it is ( + )
Then you press button ( datasource )
Then you select MySQL in dropdown and click on it
Then the IntelliJ will show you a  
 where you insert this and  press ( Test Conection )
![alt text](/readmePics/Capture.PNG)
## 4. Node.js (Express) Frontend/Backend Setup

Open Visual Studio Code and navigate to the -- /frontend  folder inside the project directory.
Install the required dependencies by running:
bash or powershell

Copy the code:
npm install express mysql nodemon

Start the Node.js server using Nodemon by running:
bash or powershell

Copy the code:
npm start

The Node.js will start on http://localhost:5000.

You can end running node frontend by pressing -- Ctrl c --
And restart it by typin npm start again, in bash or powershell

## 5. Testing and Usage

With both backends running:
The Java Spring Boot backend is accessible at http://localhost:8080.
The Node.js Express is accessible at http://localhost:5000.

## 6. Open app in browser by :

    FIRST Start the Node.js server using Nodemon by running this in -- /frontend folder:
        bash or powershell

        Copy the code:
        npm start
        
    THEN  To start BACKEND in the Spring Boot application:
        Open the main class file (e.g., DemoApplication.java) in IntelliJ.
        Run the application by clicking Run.
    
    LAST BUT NOT LEAST Open your browser and copy this in URL :
        
        http://localhost:5000


# Vocabulary
![alt text](/readmePics/Besednjak.PNG)
# UML

![alt text](/readmePics/UseCase.PNG)

# Class Diagram
![alt text](/readmePics/ClassDiagram1.PNG)

# Opis metod za aplikacijo za upravljanje receptov

Aplikacija omogoča funkcionalnosti za prikaz, dodajanje, brisanje, spreminjanje receptov ter generiranje PDF dokumentov. 
Spodaj so opisane metode v Java Spring Boot za backend in JavaScript za frontend.

## Java Spring Boot InfoController:
Namen: namen tega razreda je, da ustrezno obravnama zahteve frontenda in ustrezno pridobiva podatke
        iz podatkovne baze skozi svoje funkcije.

metode:
1.	getAllRecept (GET /recept):

	Ta metoda je odgovorna za pridobivanje vseh receptov iz baze podatkov. Ko je uporabnik na strani, ki zahteva vse recepte, bo ta metoda izvedla poizvedbo v bazi in vrnila seznam vseh receptov v formatu JSON.
	Pred izvajanjem te poizvedbe, v log zapisujemo informacijo, da se pridobivajo vsi podatki o receptih.
	Rezultat je seznam vseh receptov, ki jih lahko frontend uporabi za prikazovanje uporabniku.

2.	getReceptById (GET /recept/{id}):

	Ta metoda omogoča pridobitev posameznega recepta na podlagi specifičnega ID-ja, ki ga uporabnik posreduje. Ko uporabnik zahteva določen recept, se preveri, ali ta recept obstaja v bazi.
	Če recept obstaja, se vrne v formatu JSON. Če recept z določenim ID-jem ne obstaja, metoda vrne prazen odgovor (Optional), kar pomeni, da ni bilo najdeno nobenega recepta za podani ID.
	To omogoča pridobivanje podrobnosti o posameznem receptu, ki jih lahko frontend uporabi za prikaz specifičnih informacij.

3.	deleteRecept (DELETE /recept/{id}):

	Ta metoda omogoča brisanje recepta z določenim ID-jem. Ko uporabnik zahteva izbris recepta, se najprej preveri, ali recept z določenim ID-jem obstaja v bazi.
	Če recept obstaja, se izbriše in vrne status 200 (OK) s sporočilom, da je bil recept uspešno izbrisan. Če recept ne obstaja, se vrne napaka 404, kar pomeni, da recept ni bil najden v bazi podatkov.
	Ta metoda omogoča uporabnikom, da iz baze odstranijo recept.

4.	putRecept (PUT /recept/{id}):

	Ta metoda omogoča posodobitev obstoječega recepta v bazi podatkov. Ko uporabnik posodobi recept, se najprej preveri, ali recept z določenim ID-jem že obstaja.
	Če recept obstaja, se posodobijo podatki (naziv, sestavine, potek dela) in recept se shrani nazaj v bazo. Po uspešni posodobitvi se vrne posodobljeni recept v formatu JSON.
	Če recept z določenim ID-jem ne obstaja, se vrne status 404 (Not Found).
	To omogoča uporabnikom, da spremenijo obstoječe recepte v bazi podatkov.

5.	postRecept (POST /recept):

oTa metoda omogoča ustvarjanje novega recepta. Ko uporabnik posreduje podatke za nov recept (naziv, sestavine, potek dela), se ustvarijo novi podatki v objektu recepta, ki se shrani v bazo podatkov.
	Po tem, ko je recept uspešno shranjen, se vrne nov recept v formatu JSON, kar omogoča frontend-u, da prikaže novo ustvarjeni recept.
	Ta metoda omogoča uporabnikom, da dodajo nove recepte v bazo.
________________________________________

## Frontend JavaScript:
Namen: namen tega razreda je, da ima uporabnik ustrezno interakcijo s samo aplikacijo in njenimi funkcionalnostmi.
vloge: - prikazani gumbi, ki omogocajo ustrezne funkcionalnosti
	   - ustrezna polja za vnos podatkov, potrebnih pri funkcionalnostih
	   - estetski prikaz spletne strani

Metode:
1.	pokaziRecepte:

	Ta funkcija na strani pridobi seznam vseh receptov preko GET zahteve do strežnika. Uporabi metodo fetch za pošiljanje zahtevka na URL /recept, ki bo vrnil vse recepte v formatu JSON.
	Ko so podatki pridobljeni, funkcija ustvarja HTML elemente za vsak recept (seznam receptov), ki so nato dodani na stran. Za vsak recept se prikaže naziv, sestavine in potek dela, skupaj z gumbi za dodatne akcije (npr. brisanje, posodabljanje, ustvarjanje PDF-ja).
	Podatki o receptih se shranijo v localStorage, da jih lahko kasneje ponovno uporabimo brez ponovnega nalaganja.
	Ta funkcija omogoča uporabnikom, da vidijo vse recepte, shranjene v bazi.

2.	narediPDF:

	Ta funkcija omogoča ustvarjanje PDF dokumenta za izbrani recept. Uporablja knjižnico jsPDFInvoiceTemplate, da ustvari PDF z informacijami o receptu, kot so naziv, sestavine in potek dela.
	PDF je mogoče shraniti na računalnik uporabnika ali izpisati. PDF vključuje tudi logotip podjetja in QR kodo, ki je dodana kot "žig" na vseh straneh dokumenta.
	Ta funkcija omogoča uporabnikom, da si svoje recepte natisnejo ali shranijo v PDF formatu.

3.	izbrisiRecept:

	Ta funkcija omogoča brisanje recepta. Ko uporabnik klikne gumb za izbris, se prikaže potrditveno okno, ki uporabnika opozori, da bo izbrisal recept.
	Če uporabnik potrdi izbris, se izvede DELETE zahteva na strežnik za izbris recepta z določenim ID-jem. Po uspešnem brisanju se seznam receptov osveži, tako da se prikažejo posodobljeni podatki.
	Ta funkcija omogoča uporabnikom, da odstranijo recept iz baze.

4.	posodobiRecept:

	Ta funkcija omogoča prikaz obrazca za posodabljanje recepta. Ko uporabnik klikne gumb za posodobitev, se obrazec za posodabljanje recepta prikaže ali skrije (toggle).
	Obrazec vsebuje polja, kjer lahko uporabnik spremeni naziv, sestavine in potek dela recepta.
	Ta funkcija omogoča uporabnikom, da začnejo postopek posodobitve recepta na strani.

5.	submitUpdate:

	Ko uporabnik izpolni obrazec za posodobitev, ta funkcija ob oddaji obrazca prevzame vnesene podatke in jih pošlje na strežnik preko PUT zahteve.
	Podatki, kot so naziv, sestavine in potek dela recepta, se pošljejo na strežnik, kjer se posodobijo v bazi.
	Po uspešni posodobitvi se seznam receptov osveži, tako da se prikažejo posodobljeni podatki.
	Ta funkcija omogoča uporabnikom, da posodobijo podatke o receptu na strežniku.

6.	dodajRecept:

	Ta funkcija omogoča dodajanje novega recepta v bazo podatkov. Ko uporabnik izpolni obrazec z novim receptom, ta funkcija prebere podatke in ustvari objekt, ki vsebuje naziv, sestavine in potek dela recepta.
	Objekt se pošlje na strežnik preko POST zahteve, kjer se shrani v bazo podatkov. Po uspešnem dodajanju recepta se stran ponovno naloži, da prikaže najnovejši seznam receptov.
	Ta funkcija omogoča uporabnikom, da dodajo nove recepte v bazo.

Vsaka od teh funkcij omogoča različne operacije z recepti, kot so pridobivanje, dodajanje, posodabljanje in brisanje, povezane z ustreznimi HTTP metodami v Spring Boot aplikaciji.

## Recept
namen: je razred katerega objekte ustvarjamo, da jih lahko:
		- shranimo
		- prikazemo
		- urejamo
1. Recept(naziv, sestavine, potekdela)

Konstruktor je posebna metoda, ki se uporablja za inicializacijo novega objekta razreda Recept. Namenjen je temu, da zagotovi, da je vsak nov objekt pravilno nastavljen z vsemi potrebnimi atributi.
Ob ustvarjanju novega objekta razreda Recept konstruktor prejme tri vrednosti: naziv, sestavine, in potek dela.

Te vrednosti shrani v ustrezne atribute objekta, s čimer zagotovi, da vsebuje vse bistvene informacije za predstavitev recepta.

