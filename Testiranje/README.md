# RIS PROJECT BRUNEC TILEN, BADROV GAL 
--> oba sodelovala pri ustvarjanju vseh unit testov

# Opis testov
init():
Ta metoda je označena z @BeforeEach, kar pomeni, da se izvede pred vsakim testom. Prepiše vse podatke v repozitoriju z metodo repository.deleteAll() in preveri, ali je repozitorij prazen z Assertions.assertEquals(0, repository.count()).


postReceptTest():
Ta test je označen z @RepeatedTest(5), kar pomeni, da se izvede 5-krat. Preverja, ali se novi recept uspešno shrani v repozitorij. Test najprej preveri, ali je repozitorij prazen, nato shrani nov recept in preveri, ali je število receptov v repozitoriju 1.


deleteReceptTest():
Ta test preverja, ali se recept pravilno izbriše iz repozitorija. Recept se doda v repozitorij, nato pa se z metodo repository.deleteAll() izbrišejo vsi recepti. Na koncu test preveri, ali je število receptov v repozitoriju 0.

deleteReceptTest2():
To je negativni scenarij. Recept se doda, izbriše, vendar test preverja, da število receptov ostane 1, kar je napačno, saj bi morali po izbrisu imeti 0 receptov. Test preverja, da število receptov ne ostane 1 po brisanju.

putReceptTest():
Ta test preverja, ali se podatki obstoječega recepta pravilno posodobijo. Recept se doda v bazo, nato pa se njegovi podatki posodobijo. Test preveri, ali so podatki pravilno posodobljeni v repozitoriju, pri čemer zagotovi, da število receptov ostane 1.

putReceptTest2():
To je negativni scenarij za posodabljanje recepta. Podatki recepta se posodobijo, vendar test pričakuje napačne posodobljene vrednosti (na primer "mesni burek" namesto "Sirni burek"). Ta test preverja, ali logika posodabljanja pravilno ustreza pričakovanemu rezultatu.

testStaEnaka():
Ta test preverja, ali metoda staEnaka() pravilno deluje, ko primerja dva recepta z istim nazivom. Test zagotovi, da se dva identična recepta štejeta za enaka.

testStaEnakaMaleVlke():
Ta test preverja, ali metoda staEnaka() pravilno deluje, ko primerja recepte z istim nazivom, vendar z različnimi velikostmi črk. Test zagotovi, da razlike v velikih in malih črkah ne vplivajo na enakost (npr. "Čokoladni kolač" vs. "čokoladni kolač").

testStaEnakaDifferentNames():
Ta test preverja, ali metoda staEnaka() vrne false, ko primerja recepte z različnimi nazivi. Zagotavlja, da recepti z različnimi nazivi niso obravnavani kot enaki.

testStaEnakaPosebniChar():
Ta test preverja, ali metoda staEnaka() vrne false, ko primerja recepte z različnimi posebnimi znaki v njihovih nazivih (npr. "Pecivo z vanilijo" vs. "Pecivo z vanilíjo"). Test zagotovi, da se razlike v posebnih znakih (kot so naglašeni znaki) zaznajo.

testStaEnakaPosebniChar2():
Ta test preverja še en primer, ko so posebni znaki različni med dvema receptoma (npr. "Pecivo z vanilijo" vs. "Pecivo z vanilija"). Test zagotovi, da se razlike v posebnih znakih, kot so naglašene samoglasnike, pravilno zaznajo.
Ti testi se osredotočajo predvsem na preverjanje osnovnih operacij CRUD 

# analiza uspesnosti testov
init():
Dejanska vrednost: Število receptov v repozitoriju je 0 po klicu repository.deleteAll().
Pričakovana vrednost: Število receptov mora biti 0, kar potrdi Assertions.assertEquals(0, repository.count()).

postReceptTest():
Dejanska vrednost: Po shranitvi recepta se število receptov poveča na 1.
Pričakovana vrednost: Po shranitvi recepta mora biti število receptov v repozitoriju 1.

deleteReceptTest():
Dejanska vrednost: Po dodajanju recepta in klicu repository.deleteAll() se število receptov zmanjša na 0.
Pričakovana vrednost: Po brisanju vseh receptov mora biti število receptov 0.

deleteReceptTest2():
Dejanska vrednost: Po dodajanju recepta in klicu repository.deleteAll() naj bi število receptov postalo 0, vendar test pričakuje, da bo število ostalo 1 (kar je napaka v testu).
Pričakovana vrednost: Število receptov bi moralo biti 0 po brisanju vseh receptov. Test preverja napačen rezultat (1).

putReceptTest():
Dejanska vrednost: Po posodobitvi recepta se podatki v repozitoriju spremenijo na novo vrednost (naziv "Sirni burek", sestavine "sir", postopek "peci").
Pričakovana vrednost: Po posodobitvi recepta morajo biti podatki v repozitoriju enaki posodobljenim vrednostim, in število receptov mora ostati 1.

putReceptTest2():
Dejanska vrednost: Po posodobitvi recepta se podatki v repozitoriju spremenijo na napačne vrednosti (npr. naziv "mesni burek" in sestavine "meso").
Pričakovana vrednost: Test pričakuje napačne posodobljene vrednosti, kar pomeni, da preverja, ali metoda za posodabljanje napačno deluje (test ni pravilen, ker bi morala posodobitev pravilno spremeniti podatke).

testStaEnaka():
Dejanska vrednost: Metoda staEnaka() vrne true, ker imata oba recepta enak naziv ("Čokoladni kolač").
Pričakovana vrednost: Ker sta oba recepta enaka, mora metoda staEnaka() vrniti true.

testStaEnakaMaleVlke():
Dejanska vrednost: Metoda staEnaka() vrne true, ker imata oba recepta enak naziv ("Čokoladni kolač"), čeprav je ena različna velikost črk.
Pričakovana vrednost: Zaradi ignoriranja velikosti črk mora metoda staEnaka() vrniti true.

testStaEnakaDifferentNames():
Dejanska vrednost: Metoda staEnaka() vrne false, ker imata oba recepta različna naziva ("Čokoladni kolač" in "Vanilijev kolač").
Pričakovana vrednost: Ker imata recepta različna naziva, mora metoda staEnaka() vrniti false.

testStaEnakaPosebniChar():
Dejanska vrednost: Metoda staEnaka() vrne false, ker imata oba recepta isti naziv, vendar se razlikujeta v posebnih znakih (npr. "Pecivo z vanilijo" vs. "Pecivo z vanilíjo").
Pričakovana vrednost: Zaradi razlike v posebnih znakih mora metoda staEnaka() vrniti false.

testStaEnakaPosebniChar2():
Dejanska vrednost: Metoda staEnaka() vrne false, ker imata oba recepta isti naziv, vendar se razlikujeta v posebnih znakih (npr. "Pecivo z vanilijo" vs. "Pecivo z vanilija").
Pričakovana vrednost: Zaradi razlike v posebnih znakih mora metoda staEnaka() vrniti false.