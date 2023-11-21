/*Variável que seleciona a tag que vai receber o nome do pokemon*/
const pokemonName = document.querySelector('.pokemon_name')
/*Variável que seleciona a tag que vai receber o número do pokemon*/
const pokemonNumber = document.querySelector('.pokemon_number')
/*Variável que seleciona a tag que vai receber a imagem do pokemon*/
const pokemonImage = document.querySelector('.pokemon_image')
/*Variável que seleciona a tag que vai receber os dados do formulário*/
const form = document.querySelector('.form')
/*Variável que seleciona a tag que vai receber os dados digitados no input*/
const input = document.querySelector('.input_search')
/*Variável que seleciona a tag que vai receber os dados digitados no input*/
const buttonPrev = document.querySelector('.btn-prev')
/*Variável que seleciona a tag que vai receber os dados digitados no input*/
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1; /*variável que armazena o valor inicial a ser renderizado*/

/*Função que faz a requisição da API, passando o async para definir a função como sendo assíncrona*/
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}
    `); /*Passando o await para que não execute as demais linhas de código e o endpoint da API com a variável pokemon para receber o pokemon*/

    /*Rriando uma condição para quando o valor digital não for encontrado*/
    if (APIResponse.status === 200) {
        const data = await APIResponse.json(); /* Extraindo os dados em forma de json*/
        return data; /*Retornando o data para que possa utilizar os dados obtidos*/
    }
}

/*Função que vai renderizar os dados na tela*/
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; /*Enquanto está trazendo os dados da API aparece a mensagem para que sinalize ao usuário que está carregando*/
    pokemonNumber.innerHTML = ''; /*O campo fica vazio até ser encontrado*/

    const data = await fetchPokemon(pokemon)

    /*Criando uma condição para que se tiver alguma informação no data retorne os dados extraídos da API, caso contrário retorne que os dados não foram encontrados*/
    if (data) {
        pokemonImage.style.display = 'block'; /*Caso encontre os dados retorna a imagem*/
        pokemonName.innerHTML = data.name; /*Alterando o nome do pokemon de acordo com os dados extraídos da API*/
        pokemonNumber.innerHTML = data.id; /*Alterando o número do pokemon de acordo com os dados extraídos da API*/
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; /*Alterando a imagem do pokemon de acordo com os dados extraídos da API*/
        input.value = ''; /*Deixa o input vazio após a pesquisa*/
        searchPokemon = data.id /*Atualiza o valor inicial com o id atual de visualização*/
    } else {
        pokemonImage.style.display = 'none'; /*Ocutando a imagem caso não encontre os dados*/
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }
}

/*Função que adiciona um evento*/
form.addEventListener('submit', (event) => {

    event.preventDefault();/*Bloqueia o comportamento padrão*/

    renderPokemon(input.value.toLowerCase())/*Passando o valor capturado do inpute para a função render e passando o método lowercase transformar as letras em minúsculas possibilitando ao usuário pesquisar utilizando tanto maiúsculas como minúsculas*/
});

renderPokemon(searchPokemon); /*Chamando a função para renderizar o primeiro dado para que a imagem não fique vazia*/

/*Adicionando um evento de click no botão para que passe para o próximo dado da API*/
buttonPrev.addEventListener('click', () => {
    /*Condição para que só consigo voltar até o primeiro*/
    if (searchPokemon > 1) {

        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});