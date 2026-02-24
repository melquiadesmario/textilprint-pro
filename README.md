# 🧵 TextilPrint Pro - Dashboard de Produção

O **TextilPrint Pro** é uma solução de monitoramento de produção desenvolvida para pequenas e médias indústrias têxteis ou gráficas. O sistema permite a gestão completa de ordens de serviço (OS), desde a entrada do pedido até a entrega final, integrando o controle de estoque de insumos e o cálculo automático de preços de venda.



## 🚀 Funcionalidades

* **Gestão de Pedidos (CRUD):** Criação, visualização, atualização de status e exclusão de ordens de serviço em tempo real.
* **Motor de Orçamentos Intelegente:** Cálculo automático do preço final baseado no custo dos materiais, margem de lucro e impostos aplicáveis.
* **Controle de Insumos:** Verificação automática de estoque antes da abertura do pedido. O sistema impede a produção se não houver matéria-prima suficiente.
* **Indicadores de Performance (KPIs):** Painel dinâmico que exibe o total de pedidos e a distribuição por status (Pendente, Processando, Concluído).
* **Persistência de Dados:** Uso de `localStorage` para garantir que as informações permaneçam salvas mesmo após o fechamento do navegador.
* **Design Responsivo:** Interface adaptável para telemóveis, tablets e computadores, facilitando o uso no chão de fábrica.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do dashboard.
* **CSS3:** Estilização moderna com Flexbox e Media Queries para responsividade.
* **JavaScript (ES6+):** Lógica de negócios complexa utilizando métodos avançados de array como `.map()`, `.filter()`, `.reduce()` e `.every()`.

## 📈 Lógica de Negócio Implementada

O sistema utiliza a seguinte fórmula para o cálculo de venda:

$$PreçoFinal = CustoProducao \times (1 + margemLucro + imposto)$$

Onde o custo de produção é a soma de todos os materiais vinculados ao pedido.

## 📦 Como Executar o Projeto

1. Clone este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Não é necessária a instalação de dependências externas (Vanilla JS).

---
Desenvolvido por Melquíades Mário como parte da transição de carreira para Desenvolvimento Full-Stack.