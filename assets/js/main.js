// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

// Attenzione:
// **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.


//genero la griglia

//mi definsico il numero di celle che voglio creare
const maxCells = 100;
//genero l'array del numero di celle che mi serve
let cellsNumbers = [];

for (let i = 0; i < (maxCells); i++) {
    cellsNumbers.push(i);
}

//mi definisco il container a cui devo aggiungere le celle
const domContainer = document.querySelector(".container");


//chiamo la funzione che genera le celle ma solo quando si clicca sul bottone

//mi definisco il bottone
const generaButton = document.querySelector("button");

//aggiungo listener
generaButton.addEventListener("click", function () {

    //chiamo la funzione che genera le celle
    generateField(maxCells, domContainer);

})



//funzione che aggiunge tante celle quante le passo al parametro, e le aggiunge all'elemento della dom che passo al parametro
function generateField(max, domEl) {

    //genero l'array di bombe
    const bombs = generateBombs(1,max);

console.log(bombs);

    //ciclo i numeri di volte che devo creare la cella
    for (let i = 0; i < max; i++) {

        //per ogni ciclo mi definisco l'elemento
        //il numero da passare all'interno della cella è quello che sta ciclando dell'array
        const cellaEl = generateCellMarkup(i + 1);

        //inserisco l'elemento creato nell'elemento della dom passato a parametro
        domEl.insertAdjacentElement('beforeend', cellaEl);


        //adesso qua aggiungo un listener sulla cella con la function  per sistemare la classe active

        cellaEl.addEventListener("click", function () {
            console.log(this.innerText);

            this.classList.toggle("active");

        })

    }

}

//funzione che genera un elemento cella
//passo alla funzione il numero cehe deve essere visualizzato all'interno della cella
function generateCellMarkup(numb) {

    const cellEl = document.createElement('div');
    cellEl.className = "cell";
    cellEl.innerText = numb;
    return cellEl;

}

//funzione che genera un numero di 16 bombe comprese tra il minimo e il massimo passato al aprametro non ripetibile
function generateBombs(min,max) {

    const bombs = [];
    while (bombs.length !== 16) {
        //genero numero casuale
        const bomb = generateRandomNumber(min, max);
        //verifico se il numero è stato già insertio nella lista di bombe, 
        //se non lo è lo aggiungo altrimenti vado avanti
        if (!bombs.includes(bomb)) {
            //se la condizione è falsa eseguo il codice qui dentro
            bombs.push(bomb);
    
        }
    }
    return bombs;
}


function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

