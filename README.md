# RIS PROJECT
## Project Setup Guide

This project includes two backends: one using Java Spring Boot and the other using Node.js (Express). Both connect to a MySQL database named recepti. The project is developed using:

IntelliJ IDEA Ultimate
Visual Studio Code
XAMPP phpMyAdmin for database management.

## Prerequisites

Java Development Kit (JDK) – Java 21 or higher https://www.oracle.com/java/technologies/downloads/
Node.js and npm https://nodejs.org/en/download/package-manager
IntelliJ IDEA Ultimate https://www.jetbrains.com/idea/download/?source=google&medium=cpc&campaign=EMEA_en_EAST_IDEA_Branded&term=intellij+idea&content=693349187757&gad_source=1&gclid=Cj0KCQjwpvK4BhDUARIsADHt9sRGGZpZoyrK6ylV6hP31sc8qfPXGP8vVOregBxan3e3Q0AGOmvTz5EaArdMEALw_wcB&section=windows
Visual Studio Code https://code.visualstudio.com/download
XAMPP for MySQL and phpMyAdmin https://www.apachefriends.org/download.html
Git (optional, for version control) https://git-scm.com/downloads
Steps to Set Up the Project

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

CREATE TABLE recept (
  id INT PRIMARY KEY AUTO_INCREMENT,
  naziv VARCHAR(255) NOT NULL,
  sestavine VARCHAR(255) NOT NULL,
  potekdela VARCHAR(255) NOT NULL
);

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
Then the IntelliJ will show you a  //![alt text](Capture.PNG)// where you insert this and  press ( Test Conection )

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

    1. Start the Node.js server using Nodemon by running this in -- /frontend folder:
        bash or powershell

        Copy the code:
        npm start
        
    2. To start BACKEND in the Spring Boot application:
        Open the main class file (e.g., DemoApplication.java) in IntelliJ.
        Run the application by clicking Run.
    
    3. Open your browser and copy this in URL :
        
        http://localhost:5000
