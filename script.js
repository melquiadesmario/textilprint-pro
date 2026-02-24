// Carregar dados salvos caso exista
const dadosSalvos = localStorage.getItem('pedidos_textil');
const materiaisSalvos = localStorage.getItem('materiais_textil ');

let pedidos = dadosSalvos
    ? JSON.parse(dadosSalvos)
    : [
            {
                id: 12345678,
                cliente: 'Malharia do Sol',
                materiaisUsados: [{ id: 'm1', nome: 'Papel Couché', custoUnitario: 0.50, estoque: 1000 }],
                precoFinal: 0.68,
                status: 'pendente'
            },
            { 
                id: 90123456,
                cliente: 'Estilo Jovem',
                materiaisUsados: [{ id: 'm2', nome: 'Tinta Premium', custoUnitario: 2.00, estoque: 50 }],
                precoFinal: 2.84,
                status: 'processando'
            },
            { 
                id: 78901234,
                cliente: 'Academia Fit',
                materiaisUsados: [{ id: 'm3', nome: 'Lona Vinílica', custoUnitario: 15.00, estoque: 20 }],
                precoFinal: 20.40,
                status: 'pendente'
            }
        ];

// Função para salvar no LocalStorage
function salvarNoLocalStorage(){
    localStorage.setItem('pedidos_textil', JSON.stringify(pedidos));
}

// Materiais pré-configurados para a confecção dos produtos
let materiais = materiaisSalvos
    ? JSON.parse(materiaisSalvos)
    : [
        { id: 'm1', nome: 'Papel Couché', custoUnitario: 0.50, estoque: 1000 },
        { id: 'm2', nome: 'Tinta Premium', custoUnitario: 2.00, estoque: 50 },
        { id: 'm3', nome: 'Lona Vinílica', custoUnitario: 15.00, estoque: 20 }
    ];

// Função para salvar materiais no LocalStorage
function salvarMateriaisNoLocalStorage(){
    localStorage.setItem('materiais_textil', JSON.stringify(materiais));
}

// Configurações de venda
const configuracaoVenda = {
  margemLucro: 0.35, // 35%
  imposto: 0.12     // 12%
};

// Calcular o preço base do produto com base nos materiais utilizados
function calcularPrecoBase(id, qtd){
    const material = materiais.find(m => m.id === id);
    if(material){
        if(material.estoque >= qtd){
            const precoBase = material.custoUnitario * qtd;
            material.estoque -= qtd;
            return precoBase;
        } else {
            alert(`Estoque insuficiente para o material ${material.nome}. Estoque atual: ${material.estoque}, quantidade solicitada: ${qtd}.`);
            return 0;
        }
    } else {
        alert(`Material com ID ${id} não encontrado ou estoque insuficiente.`);
        return 0;
    }  
}

// Função com desestruturação para calcular o preço final
function calcularPrecoVenda(custoProducao){
    // Usando desestruturação para extrair valores
    const { margemLucro, imposto} = configuracaoVenda;

    // Aplicando a fórmula de preço de venda
    const precoFinal = custoProducao * (1 + margemLucro + imposto);

    return precoFinal;
}

// Verificar pedido se pode ser produzido com base no estoque disponível
function podeProduzir(pedido){
    return pedido.every(item => {
        // Localizar o material pelo ID
        const material = materiais.find(m => m.id === item.materialId);
        
        // Verificar se o material existe e se o estoque é suficiente
        if(!material){
            console.warn(`Material com ID ${item.materialId} não encontrado.`);
            return false;
        }

        return material.estoque >= item.qtd;
    });
}

// Total de pedidos, pedidos pendentes e concluídos usando reduce para calcular os totais
function calcularTotais(){
    const totalPedidos = pedidos.length;
    const totalPendentes = pedidos.reduce((total, pedido) => pedido.status === 'pendente' ? total + 1 : total, 0);
    const totalProcessando = pedidos.reduce((total, pedido) => pedido.status === 'processando' ? total + 1 : total, 0);
    const totalConcluidos = pedidos.reduce((total, pedido) => pedido.status === 'concluido' ? total + 1 : total, 0);

    document.getElementById('totalPedidos').textContent = totalPedidos;
    document.getElementById('pedidosPendentes').textContent =totalPendentes;
    document.getElementById('pedidosProcessando').textContent = totalProcessando;
    document.getElementById('pedidosConcluidos').textContent = totalConcluidos;
}
calcularTotais();

// Função para Adicionar um pedido
function adicionarPedido(){
    // Pegando o valor do input e criar um novo pedido com ID Data.now() para garantir um ID único e status 'pendente'
    const inputCliente = document.getElementById('addInput');
    const nomeCliente = inputCliente.value.trim();

    const inputMaterial = document.getElementById('itens');
    let materialSelecionado = inputMaterial.value.trim();

    const inputQtd = document.getElementById('addQtd');
    const qtdMaterial = Number(inputQtd.value.trim());
    let precoFinal = 0;

    /* // Convertendo o valor em objeto material
    switch(materialSelecionado){
        case 'sm':
            alert('Por favor, selecione um material válido.');
            return;
        case 'm1':
            materialSelecionado = materiais.find(m => m.id === materialSelecionado);
            const precoM1 = calcularPrecoBase(materialSelecionado.id, qtdMaterial);
            precoFinal = calcularPrecoVenda(precoM1);
            break;
        case 'm2':
            materialSelecionado = materiais.find(m => m.id === materialSelecionado);
            const precoM2 = calcularPrecoBase(materialSelecionado.id, qtdMaterial);
            precoFinal = calcularPrecoVenda(precoM2);
            break;
        case 'm3':
            materialSelecionado = materiais.find(m => m.id === materialSelecionado);
            const precoM3 = calcularPrecoBase(materialSelecionado.id, qtdMaterial);
            precoFinal = calcularPrecoVenda(precoM3);
            break;
        default:
            alert('Material selecionado inválido.');
            return;
    } */

    // Opção ao switch longo
    if(materialSelecionado !== 'sm'){
        const material = materiais.find(m => m.id === materialSelecionado);

        if(material){
            const precoBase = calcularPrecoBase(material.id, qtdMaterial);
            precoFinal = calcularPrecoVenda(precoBase);
            materialSelecionado = material; // Atualizando para objeto
        }else{
            alert('Selecione um material!');
            return;
        }
    }

    const createId = Number(Date.now().toString().slice(-6));

    if(nomeCliente){
        if(materialSelecionado){
            if(qtdMaterial > 0){
                if(materialSelecionado.estoque >= qtdMaterial){
                    const novoPedido = {
                        id: createId,
                        cliente: nomeCliente,
                        materiaisUsados: [materialSelecionado],
                        precoFinal: precoFinal.toFixed(2),
                        status: 'pendente'
                    };

                    // Adicionando o novo pedido na lista utilizando o spread operator para criar um novo array
                    pedidos = [...pedidos, novoPedido];

                    // Salvando a nova lista no LocalStorage
                    salvarNoLocalStorage();
                    // Salvando a nova lista de materiais no LocalStorage
                    salvarMateriaisNoLocalStorage();
                    // Atualizando a tela após a mudança de status
                    renderizarTabela();
                    // Limpando o campo de input após adicionar o pedido
                    inputCliente.value = '';
                    inputMaterial.value = 'sm';
                    inputQtd.value = '';
                    // Recalculando os totais após a mudança de status
                    calcularTotais();
                }else{
                    alert(`Estoque insuficiente para o material ${materialSelecionado.nome}.
                    Estoque atual: ${materialSelecionado.estoque}
                    Quantidade solicitada: ${qtdMaterial}.`);
                    return;
                }
            }else{
                alert('Por favor, a quantidade deve ser maior que zero!.');
                return;
            }
        }else{
            alert('Por favor, selecione um material válido!.');
            return;
        }
    }else{
        alert('Por favor, preencha o nome do Cliente!.');
        return;
    }
}

// Função para Avançar o status do pedido
function avancarPedido(id){
    // Localizando o pedido pelo ID
    const pedido = pedidos.find(item => item.id === Number(id));

    if(pedido){
        // Lógica de troca de Status
        if(pedido.status === 'pendente'){
            pedido.status = 'processando';
        } else if(pedido.status === 'processando'){
            pedido.status = 'concluido';
        }

        // Salvando o novo status no LocalStore
        salvarNoLocalStorage();
        // Salvando a nova lista de materiais no LocalStorage
        salvarMateriaisNoLocalStorage();
        // Atualizando a tela após a mudança de status
        renderizarTabela();
        // Recalculando os totais após a mudança de status
        calcularTotais();
    
    // Dispara um alerta caso o usuário digite um ID que não exista na lista
    }else{
        alert('Você digitou um ID de Pedido que não existe na lista');
    }
}

// Função para Excluir um pedido
function excluirPedido(id){
    // Filtrando pelo ID, novo array sem o pedido excluído
    const pedidosFiltrados = pedidos.filter(item => item.id !== Number(id));

    if(pedidosFiltrados){
        pedidos = pedidosFiltrados; // Atualizando a variável global com o novo array
        salvarNoLocalStorage(); // Salvando a nova lista no LocalStorage
        salvarMateriaisNoLocalStorage(); // Salvando a nova lista de materiais no LocalStorage
        // Atualizando a tela após a mudança de status
        renderizarTabela();
        // Recalculando os totais após a mudança de status
        calcularTotais();
    }
}

// Filtro de busca com evento oninput atualizar a tabela em tempo real
const inputBusca = document.getElementById('buscarInput');
inputBusca.oninput = function(){
    const valorBusca = inputBusca.value.trim().toLowerCase();

    // Método filter e includes para verificar o cliente
    const pedidosFiltrados = pedidos.filter(pedido => pedido.cliente.toLowerCase().includes(valorBusca));
    
    // Renderizando a tabela apenas com os pedidos filtrados
    renderizarTabelaFiltrada(pedidosFiltrados);
}

// Buscar clients
function buscarCliente(){
    // Limpar o campo de busca e renderizar a tabela completa
    inputBusca.value = '';
    renderizarTabela();
    console.log('ok');
}

// Função para renderizar a tabela filtrada
function renderizarTabelaFiltrada(pedidosFiltrados){
    tabela.innerHTML = ''; // Limpar tabela antes

    pedidosFiltrados.forEach(pedido => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.precoFinal}</td>
            <td class='status-${pedido.status}'>${pedido.status.toUpperCase()}</td>
            <td>
                <button class='btn-avancar' onclick='avancarPedido(${pedido.id})'>Avançar</button>
            </td>
            <td>
                <button class='btn-excluir' onclick='excluirPedido(${pedido.id})'>Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

const tabela = document.getElementById('tabela-pedidos');

// Função para renderizar a tabela completa
function renderizarTabela(){
    tabela.innerHTML = ''; // Limpar tabela antes

    pedidos.forEach(pedido => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.precoFinal}</td>
            <td class='status-${pedido.status}'>${pedido.status.toUpperCase()}</td>
            <td>
                <button class='btn-avancar' onclick='avancarPedido(${pedido.id})'>Avançar</button>
            </td>
            <td>
                <button class='btn-excluir' onclick='excluirPedido(${pedido.id})'>Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    });
}

renderizarTabela();