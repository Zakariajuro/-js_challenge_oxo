// ON CHARGE LES INFORMATIONS UTILES
let statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""];

// On définit les conditions de victoire
let condiVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

// MESSAGES

let gagne = () => `le joueur ${joueurActif} a gagné !! 🏆 👏`;
let egalite = () => `égalité 😬`;
let tourJoueur = () => `C'est au tour du joueur ${joueurActif} 🔥`

// On affiche quel joueur commence
statut.innerHTML = tourJoueur()

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener('click', gestionClickCase));
document.querySelector("#recommencer").addEventListener('click', recommencer)

// Cette fonction gère le clic sur les cases du jeu
function gestionClickCase(){

    // ON RECUPERE L'INDEX DE LA CASE CLIQUEE
    let indexCase = parseInt(this.dataset.index)
    // console.log(indexCase);

    // On vérifie si la case est déjà remplie ou le jeu terminé
    if (etatJeu[indexCase] != "" || !jeuActif) {
        return
    }
    // On écrit le symbole du joueur dans le tableau etatJeu et la case
    etatJeu[indexCase] = joueurActif
    // console.log(etatJeu);
    this.innerHTML = joueurActif

    // On vérifie si le joueur a gagné
    verifGagne()
}

// Cette fonction vérifie si le joueur a gagné
function verifGagne(){
    let tourGagnant = false

     // On parcourt toutes les conditions de victoire
    for(let condiVict of condiVictoire){
         // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[condiVict[0]]
        let val2 = etatJeu[condiVict[1]]
        let val3 = etatJeu[condiVict[2]]

        // Si l'une des cases est vide
        if (val1 == "" || val2 =="" || val3 == "") {
            continue
        }

        // Si les 3 cases sont identiques
        if (val1 == val2 && val2 == val3) {

            // on gagne 
            tourGagnant = true
            break;
        }
    }

    // Si on a gagné
    if (tourGagnant) {
        statut.innerHTML = gagne()
        joueurActif = false
        return
    }

     // Si toutes les cases sont remplies
    if (!etatJeu.includes("")) {
        statut.innerHTML = egalite()
        joueurActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif == "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

// Cette fonction réinitialise le jeu
function recommencer(){
    jeuActif = true;
    joueurActif = "X"
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}