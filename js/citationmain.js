/*Selection of random sentence parts to create a full sentence*/
function choosingRandomPart(sentenceName) {
    var randomPart = sentenceName[Math.floor(Math.random() * sentenceName.length)];
    return randomPart;
}
/*Prototype for a generator to initialize the 3 parts of the sentence
and then to return the full sentence combined*/
var QuoteGenerator = {
    init: function (start, middle, end) {
        this.start = start;
        this.middle = middle;
        this.end = end;
    },
    decrire: function () {
        var description = '"' + choosingRandomPart(this.start) + ' ' + choosingRandomPart(this.middle) + ' ' + choosingRandomPart(this.end) + '."';
        return description;
    }
};
/*Creation of the two quote generators*/
var frQuote = Object.create(QuoteGenerator);
frQuote.init(
    ["La plupart des gens trouvent que", "Avant de vouloir qu'un logiciel soit réutilisable", "Si debugger c'est supprimer des bugs alors", "Débugger c'est comme être", "Si tout fonctionne c'est", "Un programme n'est jamais fini", "Intelligence Artificielle signifie que", "Si ce n'est pas un bug alors", "Un bug se situe", "C'est comme une affaire personnelle entre toi et le bug", "Il n'y a jamais de bugs dans les programmes que j'écris", "Les roses sont rouges"],
    ["le concept de la programmation évident", "il faudrait d'abord", "programmer ne peut être que", "un détective dans un film policier où on est", "un bug mais surtout", "on arrête juste", "la machine est capable de prévoir à quel moment elle doit", "ça ne peut que être", "entre la chaise", "l'un des deux doit être mort avant", "juste des caractéristiques", "mon écran est bleu"],
    ["mais la réalisation est impossible", "qu'il ait été utilisable", "ajouter des bugs", "le détective mais aussi le tueur", "ne le corrigez pas", "d'y travailer", "tomber en panne pour optimiser votre stress", "une fonctionnalité", "et le clavier", "demain à l'aube", "non documentées", "et je suis assis là à rien faire"]
);

var enQuote = Object.create(QuoteGenerator);
enQuote.init(
    ["Most people find that", "Before wanting software to be reusable", "If debugging is deleting the bugs", "Debugging is like", "If everything works it’s", "A program is never finished", "Artificial Intelligence means that", "If it’s not a bug", "There is never bugs in the programs i write", "It’s a personal affair between you and the bug", "A bug is located", "Roses are red"],
    ["the concept of programming is obvious", "it should first", "then programming can only be", "being a detective in a crime movie where you are", "a bug but most important", "we just stop", "the machine is capable to predict at which moment", "then it can only be", "just features", "one must be dead before", "between the chair", "my screen is blue"],
    ["but the implementation is impossible", "be usable", "adding the bugs", "the detective but also the murderer", "don't fix it", "working on it", "it should break down to optimize your stress", "a feature", "that aren’t documented", "tomorrow at dawn", "and the keyboard", "and i’m standing here thinking what to do"]
);

/*Console Game and variables for choosing the game*/
var choix,
    formgame = document.getElementById('formgame');

/*Asking for number of quotes */
function numberQuotes() {
    return 'Combien de citations souhaitez vous? (entre 1 et 5)';
}
/*Creation of quotes in the console if the choice is between 1 and 5,
if not the prompt loops until the user enters a correct value*/
function quoteNumbers(generator) {
    var i;
    choix = Number(prompt(numberQuotes()));
    while (choix !== 0 && choix < 1 || choix > 5 || isNaN(choix)) {
        choix = Number(prompt("Ceci n'est pas un chiffre ou nous n'acceptons pas ce chiffre, veuillez réessayer \n" + numberQuotes()));
    }
    if (choix >= 1 && choix <= 5) {
        for (i = 1; i <= choix; i++) {
            console.log(generator.decrire());
        }
        console.log('On recommence?');
        choix = prompt('Voulez vous continuer? OK pour continuer, 0 ou annuler pour arrêter');
    }
}
/* Selecting if to generate quotes in the console or the page */
formgame.addEventListener('submit', function (e) {
    var gamechoice = document.getElementById('gamechoice'),
        displaypage = document.getElementById('pagecontent'),
        thechoice = formgame.elements.jeu.value,
        refresh = document.createElement('p');
    refresh.textContent = 'Actualiser la page pour jouer de nouveau';
    
    document.querySelector('body').removeChild(gamechoice);
    
    if (thechoice === "console") { //Console Game will start
        console.log('Bienvenue à notre générateur de citations!');
        console.log('Liste des générateurs : \n 1 : Citations en Français \n 2 : Quotes in English \n 0 : Arrêter / Stop');
        while (choix !== '0') {// Until 0 or cancel is selected, the generator will loop
            choix = prompt('Liste des générateurs : \n 1 : Citations en Français \n 2 : Quotes in English \n 0 : Arrêter / Stop');
            if (choix === '1') {
                quoteNumbers(frQuote);
            } else if (choix === '2') {
                quoteNumbers(enQuote);
            }
            if (choix === null) {
                choix = '0';
            }
        }
        alert('Au revoir / Goodbye');
        console.log('Au revoir / Goodbye');
        document.querySelector('body').insertBefore(refresh, displaypage);
    } else { //Page game will start
        displaypage.style.visibility = 'visible';
    }
    e.preventDefault();
});

/*Page Game*/
/*Elements of the page */
var errornumber = document.getElementById('numbererror'),
    errortext = document.getElementById('notanumbererror'),
    form = document.getElementById('quotecreation'),
    generatedquotes = document.getElementById("generatedquotes"),
    title = document.querySelector('h2');

/*Making quote appear on page*/
function createSentenceOnPage(quote) {
    var newSentence = document.createElement("p");
    newSentence.textContent = quote.decrire();
    generatedquotes.appendChild(newSentence);
}

/*Choosing how many quotes to show and making error messages appear if not between 1 and 5*/
function numberChoice(input, generatorChosen) {
    var i;
    if (input >= 1 && input <= 5) {
        title.style.visibility = 'visible';
        errornumber.style.display = 'none';
        errortext.style.display = 'none';
        for (i = 1; i <= input; i++) {
            createSentenceOnPage(generatorChosen);
        }
    } else if (input < 1 || input > 5) {
        errornumber.style.display = 'block';
        errortext.style.display = 'none';
    } else {
        errortext.style.display = 'block';
        errornumber.style.display = 'none';
    }
}

/*Making quotes appear after submission and clearing all generated quotes*/
form.addEventListener('submit', function (e) {
    var inputValue = form.elements.quotenumber.value,
        eraseElt = document.getElementById("effacer");
    switch (form.elements.generator.value) {
    case "french":
        numberChoice(inputValue, frQuote);
        break;
    case "english":
        numberChoice(inputValue, enQuote);
        break;
    }
    eraseElt.addEventListener('click', function () {
        generatedquotes.innerHTML = '';
        errornumber.style.display = 'none';
        errortext.style.display = 'none';
        title.style.visibility = 'hidden';
    });
    e.preventDefault();
});