function cadastrarFinalGame() {

	const name = document.getElementById('name').value;
    const squad = document.getElementById('squad').value;
    const genero = document.getElementById('genero').value;
    const integrantes = document.getElementById('integrantes').value;
    let url = document.getElementById('url').value;
    let thumbnailpath = document.getElementById('thumbnailpath').value;

    // Remover o prefixo "http://"
    url = url.replace(/^https?:\/\//, '');
    thumbnailpath = thumbnailpath.replace(/^https?:\/\//, '');

    const requestBody = {
        name,
        squad,
        genero,
        integrantes,
        url,
        thumbnailpath
    };

    fetch('http://localhost:8080/jogos/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            alert('Jogo cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
             location.reload();
        })
        .catch(error => {
            console.error('Erro ao cadastrar jogo:', error);
        });
}

function ListarFinalGame() {
    alert("1");

    fetch(`http://localhost:8080/jogos`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Lista de Jogos não encontrada');
            }
            return response.json();
        })
        .then(data => {

            const tbodyElement = document.getElementById('jogos-tabela').querySelector('tbody');
            tbodyElement.innerHTML = '';

            // Preenche a tabela com os resultados da pesquisa
            data.forEach(finalGame => {
                const linhaFinalGame = document.createElement('tr');
                linhaFinalGame.innerHTML = `
                    <td>${finalGame.id}</td>
                    <td>${finalGame.name}</td>
                    <td>${finalGame.genero}</td>
                    <td>${finalGame.squad}</td>
                    <td>${finalGame.integrantes}</td>
                    <td>${finalGame.url}</td>
                    <td><a href="https://${finalGame.thumbnailpath}">Acesse a imagem</a></td>
                `;
                tbodyElement.appendChild(linhaFinalGame);
            });  
        })
        // Trata os Erros
        .catch(error => {
            console.error('Erro ao pesquisar funcionário:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Jopo não encontrado.';
        });
}
function deletarFinalGame() {
    pesquisarJogo();
    if (result == 1) {
        const name = document.getElementById('name').value;
    	const squad = document.getElementById('squad').value;
    	const genero = document.getElementById('genero').value;
    	const integrantes = document.getElementById('integrantes').value;
    	let url = document.getElementById('url').value;
    	let thumbnailpath = document.getElementById('thumbnailpath').value;

        fetch(`http://localhost:8080/jogos/${searchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, squad, genero, integrantes, url, thumbnailpath}),
        })
            .then(response => response.json())
            .then(data => {
                alert('Jogo deletado com sucesso!');
                document.getElementById('cadastroForm').reset();                
            })
            .catch(error => {
                console.error('Erro ao deletar jogo:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum jogo foi alterado. Favor pesquisar jogo a ser alterado !!!');
    }
}
