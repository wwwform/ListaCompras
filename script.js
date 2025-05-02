document.getElementById('adicionar').addEventListener('click', adicionarItem);
document.getElementById('limpar').addEventListener('click', limparLista);

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
}

function limparLista() {
    if (confirm("Tem certeza que deseja limpar todos os itens da lista?")) {
        document.getElementById('itens-lista').innerHTML = '';
        total = 0;
        document.getElementById('total').textContent = "R$ 0,00";
    }
}

