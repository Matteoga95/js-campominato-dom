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
let maxCells = 100;
//genero l'array del numero di celle che mi serve
let cellsNumbers = [];

//mi definisco il counter del punteggio ottenuto
let score = 0;

//mi salvo una variabile booleana in caso true faccio fermare il gioco 
let stopGame = false;

//prima di generare le celle controllo la difficoltà e faccio in modo che possa essere cambiata
const diff = document.getElementById("diff-btn");
diff.addEventListener("click", function () {

    setDifficult()


})


//creo l'array di numeri in base alla variabile max cells
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

    //disabilito il bottone
    generaButton.disabled = true
    //e anche quello della difficoltà
    diff.disabled = true

    //chiamo la funzione che genera le celle
    generateField(maxCells, domContainer);

})








//funzione che aggiunge tante celle quante le passo al parametro, e le aggiunge all'elemento della dom che passo al parametro
function generateField(max, domEl) {

    //genero l'array di bombe
    const bombs = generateBombs(1, max);

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


            //adesso prima di vedere che colore mettere mi chiedo se il numero di questa cella è contenuto nell'array di bombe, se si allora gli metto la classe rossa, altrimenti azzurra

            if (bombs.includes(Number(cellaEl.innerText))) {

                //aggiungo classe active red solo se non la ha già e se la partita non si è fermata
                if (!this.classList.contains("active-red") && stopGame == false) {

                    this.classList.add("active-red");
                    console.log(this.innerText);

                    //se tocco una cella rossa termina la partita                
                    stopGame = true;
                    //faccio le operazioni in caso di perdita
                    getGameResult(false)
                }

            } else {

                //aggiungo classe active solo se non la ha già e se la partita non si è fermata
                if (!this.classList.contains("active") && stopGame == false) {
                    console.log(stopGame);
                    this.classList.add("active");
                    console.log(this.innerText);
                    //se tocco una cella azzurra aumento lo score
                    score++;
                    console.log(max);
                    //se lo score tocca il massimo finisco la partita perchè ha vinto
                    if (score == (max - 16)) {
                        stopGame = true;

                        //faccio le operazioni in caso di vincita
                        getGameResult(true)
                    }

                }
            }
        })
    }

}

//funzione che genera un elemento cella
//passo alla funzione il numero cehe deve essere visualizzato all'interno della cella
function generateCellMarkup(numb) {

    const cellEl = document.createElement('div');
    cellEl.className = "cell";
    cellEl.innerText = numb;

    //in base alla difficoltà scelta modifico la width della cella
    if (maxCells == 100) {
        cellEl.style.width = 'calc(95% / 10)'
    } else if (maxCells == 81) {
        cellEl.style.width = 'calc(95% / 9)'
    } else if (maxCells == 49) {
        cellEl.style.width = 'calc(95% / 7)'
    }

    return cellEl;

}

//funzione che genera un numero di 16 bombe comprese tra il minimo e il massimo passato al aprametro non ripetibile
function generateBombs(min, max) {

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

//funzione di disattivazione della partita, mette lo score e dice che è finita 
function getGameResult(vinto) {

    const resEl = document.getElementById("result");
    //prima vedo se ha perso o meno
    if (vinto == false) {

        //ha perso 
        resEl.innerText = "Hai perso mi dispiace, hai totalizzato un punteggio totale di " + score + ", ricarica la pagina per cominciare una nuova partita"


    } else {
        //ha vinto
        resEl.innerText = "Hai vinto congratulazioni, hai totalizzato un punteggio totale di " + score + ", ricarica la pagina per cominciare una nuova partita"



    }
}



// check difficult
function setDifficult() {
    const diffSpan = document.getElementById("difficult");
    //se modalità easy metto difficoltà normale
    if (diffSpan.classList.contains("ez") == true) {

        //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
        diffSpan.classList.remove("ez");
        diffSpan.classList.add("normal");
        diffSpan.innerText = "Normal";
        maxCells = 81;


    } else if (diffSpan.classList.contains("normal") == true) {
        //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
        diffSpan.classList.remove("normal");
        diffSpan.classList.add("hard");
        diffSpan.innerText = "Hard";
        maxCells = 49;

    } else if (diffSpan.classList.contains("hard") == true) {
        //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
        diffSpan.classList.remove("hard");
        diffSpan.classList.add("ez");
        diffSpan.innerText = "Easy";

        //sistemop il max cell in base alla difficoltà
        maxCells = 100;
    }

}
//     console.log("sono entrato");
//     const diff = document.getElementById("diff-btn");
//     diff.addEventListener("click", function () {

// console.log("ho cliccato");

//         const diffSpan = document.getElementById("difficult");
//         //se modalità easy metto difficoltà normale
//         if (diffSpan.classList.includes("ez") == true) {

//             //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
//             diffSpan.classList.remove("ez");
//             diffSpan.classList.add("normal");
//             diffSpan.innerText = "Normal"

//         } else if (diffSpan.classList.includes("normal") == true) {
//             //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
//             diffSpan.classList.remove("normal");
//             diffSpan.classList.add("hard");
//             diffSpan.innerText = "Hard"

//         } else if (diffSpan.classList.includes("hard") == true) {
//             //rimuovo la classe, metto quella nuova, sistemo il testo e la variabile della larghezza delle celle
//             diffSpan.classList.remove("hard");
//             diffSpan.classList.add("ez");
//             diffSpan.innerText = "Easy"

//         }


//     })

// }


