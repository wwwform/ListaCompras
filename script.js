// Esperar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item');
    const quantidadeInput = document.getElementById('quantidade');
    const valorInput = document.getElementById('valor');
    const adicionarBtn = document.getElementById('adicionar');
    const limparBtn = document.getElementById('limpar');
    const lista = document.getElementById('itens-lista');
    const totalSpan = document.getElementById('total');

    let total = 0;
    let itens = [];

    // Carregar dados do localStorage se existirem
    if (localStorage.getItem('itens')) {
        itens = JSON.parse(localStorage.getItem('itens'));
        total = parseFloat(localStorage.getItem('total')) || 0;
        atualizarLista();
        atualizarTotal();
    }

    adicionarBtn.addEventListener('click', adicionarItem);
    limparBtn.addEventListener('click', limparLista);

    function adicionarItem() {
        const item = itemInput.value.trim();
        const quantidade = parseFloat(quantidadeInput.value);
        const valor = parseFloat(valorInput.value);

        if (!item || isNaN(quantidade) || quantidade <= 0 || isNaN(valor) || valor <= 0) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const subtotal = quantidade * valor;
        total += subtotal;

        const itemFormatado = {
            nome: item,
            quantidade: quantidade,
            valor: valor,
            subtotal: subtotal
        };

        itens.push(itemFormatado);
        salvarDados();

        atualizarLista();
        atualizarTotal();
        limparCampos();
    }

    function atualizarLista() {
        lista.innerHTML = '';
        itens.forEach(({ nome, quantidade, valor, subtotal }) => {
            const li = document.createElement('li');
            li.textContent = `${nome} - ${quantidade} x R$ ${valor.toFixed(2)} = R$ ${subtotal.toFixed(2)}`;
            lista.appendChild(li);
        });
    }

    function atualizarTotal() {
        totalSpan.textContent = `R$ ${total.toFixed(2)}`;
    }

    function limparCampos() {
        itemInput.value = '';
        quantidadeInput.value = '';
        valorInput.value = '';
    }

    function limparLista() {
        if (confirm("Tem certeza que deseja limpar todos os itens da lista?")) {
            itens = [];
            total = 0;
            salvarDados();
            atualizarLista();
            atualizarTotal();
        }
    }

    function salvarDados() {
        localStorage.setItem('itens', JSON.stringify(itens));
        localStorage.setItem('total', total);
    }

    // Exportar lista como arquivo .txt
    const exportarBtn = document.createElement('button');
    exportarBtn.textContent = 'Exportar Lista';
    exportarBtn.className = 'btn';
    exportarBtn.addEventListener('click', () => {
        if (itens.length === 0) {
            alert("Não há itens para exportar.");
            return;
        }

        const conteudo = itens.map(i =>
            `${i.nome} - ${i.quantidade} x R$ ${i.valor.toFixed(2)} = R$ ${i.subtotal.toFixed(2)}`
        ).join('\n') + `\n\nTotal: R$ ${total.toFixed(2)}`;

        const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'lista_de_compras.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    document.querySelector('.footer').appendChild(exportarBtn);
});
