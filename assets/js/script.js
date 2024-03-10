// função para ler os posts do resquest e mostrá-los
async function readPosts () {
    let postsArea = document.querySelector('.posts');
    postsArea.innerHTML = 'Carregando...'

    let responde = await fetch ('https://jsonplaceholder.typicode.com/posts');
    let json = await responde.json();

    if (json.length > 0) {
        postsArea.innerHTML = '';

        for(newJson of json){
            let newDiv = document.createElement('div');
            let h1 = document.createElement('h1');
            let p = document.createElement('p');
            let hr = document.createElement('hr');

            h1.innerHTML = newJson.title;
            p.innerHTML = newJson.body;

            newDiv.appendChild(h1);
            newDiv.appendChild(p);
            newDiv.appendChild(hr);
            postsArea.appendChild(newDiv);
        }
    } else {
        console.log('Não existem posts.');
    }
}

// função para adicionais novos posts e depois limpar os campos
async function addNewPost (title, body) {
    await fetch (
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );
    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    readPosts();
}

// Evento de click para pegar os valores dos campos
// condição que se tiver title e body usa a função para add novos posts
document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body){
        addNewPost(title, body);
    } else {
        alert('Preencha todos os campos.')
    }
})

readPosts();