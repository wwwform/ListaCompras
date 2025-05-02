document.getElementById('adicionar').addEventListener('click', adicionarItem);
document.getElementById('limpar').addEventListener('click', limparLista);
document.getElementById('exportar').addEventListener('click', exportarLista);

let total = 0;

function adicionarItem() {
    const item = document.getElementById('item').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const valor = parseFloat(document.getElementById('valor').value);

    if (!item || quantidade <= 0 || valor <= 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const subtotal = quantidade * valor;
    total += subtotal;

    const lista = document.getElementById('itens-lista');
    const li = document.createElement('li');
    li.textContent = `${item} - ${quantidade} x R$ ${valor.toFixed(2)} = R$ ${subtotal.toFixed(2)}`;
    lista.appendChild(li);

    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;

    // Limpar campos
    document.getElementById('item').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';

    salvarNoLocalStorage();
}

function limparLista() {
    if (confirm("Tem certeza que deseja limpar todos os itens da lista?")) {
        document.getElementById('itens-lista').innerHTML = '';
        total = 0;
        document.getElementById('total').textContent = "R$ 0,00";
        localStorage.removeItem('itens');
        localStorage.removeItem('total');
    }
}

function exportarLista() {
    const itens = document.getElementById('itens-lista').getElementsByTagName('li');
    let texto = "Itens da Lista de Compras:\n\n";

    for (let i = 0; i < itens.length; i++) {
        texto += itens[i].textContent + "\n";
    }

    texto += `\nTotal: R$ ${total.toFixed(2)}`;

    const blob = new Blob([texto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lista_de_compras.txt';
    a.click();
    URL.revokeObjectURL(url);
}

// Salva a lista e total no localStorage
function salvarNoLocalStorage() {
    const itens = [];
    const listaElement = document.getElementById('itens-lista').getElementsByTagName('li');
    
    for (let i = 0; i < listaElement.length; i++) {
        itens.push(listaElement[i].textContent);
    }

    localStorage.setItem('itens', JSON.stringify(itens));
    localStorage.setItem('total', total);
}

// Restaura a lista e total do localStorage
function restaurarDoLocalStorage() {
    const itens = JSON.parse(localStorage.getItem('itens'));
    const totalSalvo = localStorage.getItem('total');

    if (itens) {
        const lista = document.getElementById('itens-lista');
        itens.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            lista.appendChild(li);
        });
        total = parseFloat(totalSalvo);
        document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Chama a função para restaurar ao carregar a página
window.onload = function() {
    restaurarDoLocalStorage();
};
