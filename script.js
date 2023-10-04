document.getElementById('startQuiz').addEventListener('click', startQuiz);

const questions = [
    "What's your favorite color?",
    "Do you like the mountains or the beach?",
    "What's your favorite food?",
    // Add more questions as required
];

const userAnswers = [];

let currentQuestionIndex = 0;

function displayQuestion(index) {
    console.log(questions[index]);
    const questionContainer = document.createElement('div');
    questionContainer.innerHTML = `
        <h2>Question ${index + 1}: ${questions[index]}</h2>
        <input type="text" id="answer" class="form-control">
        <button id="nextQuestion" class="btn btn-primary mt-3">Next</button>
    `;

    document.querySelector('.container').appendChild(questionContainer);
    document.getElementById('nextQuestion').addEventListener('click', () => {
        userAnswers.push(document.getElementById('answer').value);
        questionContainer.remove();
        console.log(userAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            displayAnswers();
        }
    });
}


function startQuiz() {
    // Hide the welcome screen elements
    document.querySelector('.jumbotron').style.display = 'none';

    displayQuestion(currentQuestionIndex);
    console.log('Starting the quiz...');
}

function displayAnswers() {
    const answersContainer = document.createElement('div');

    questions.forEach((question, index) => {
        answersContainer.innerHTML += `
            <div class="card mt-3">
                <div class="card-body">
                    <h5 class="card-title">Question ${index + 1}: ${question}</h5>
                    <p class="card-text">Your answer: ${userAnswers[index]}</p>
                </div>
            </div>
        `;
    });

    answersContainer.innerHTML += `
        <div class="mt-3">
            <p>Are you okay with your answers?</p>
            <button id="confirm" class="btn btn-success">✔️</button>
            <button id="restart" class="btn btn-danger">❌</button>
        </div>
    `;

    document.querySelector('.container').appendChild(answersContainer);

    document.getElementById('confirm').addEventListener('click', () => {
        answersContainer.remove();  // This will remove the entire answers container
        fetchRandomPokemon();
    });

    document.getElementById('restart').addEventListener('click', () => {
        // Restart the entire process
        answersContainer.remove();
        userAnswers.length = 0; // Clear the answers array
        currentQuestionIndex = 0;
        displayQuestion(currentQuestionIndex);
    });
}



function fetchRandomPokemon() {
    // The API has data for 898 Pokémon. Adjust this number if the API updates.
    console.log('pokemmon fetched...');
    const randomPokedexNumber = Math.floor(Math.random() * 898) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokedexNumber}`)
        .then(response => response.json())
        .then(pokemon => displayPokemonResult(pokemon))
        .catch(error => console.error("Failed to fetch Pokémon:", error));
}

function displayPokemonResult(pokemon) {
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('card'); // Add the card class here

    const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    resultContainer.innerHTML = `
        <h2>Your spirit Pokémon is ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}!</h2>
        <img src="${pokemonImageURL}" alt="${pokemon.name}" style="max-width: 300px; height: auto;">
        <div class="mt-3">
            <button id="restartQuiz" class="btn btn-primary">Start Over</button>
        </div>
    `;

    document.querySelector('.container').appendChild(resultContainer);

    document.getElementById('restartQuiz').addEventListener('click', () => {
        location.reload();
    });
}




