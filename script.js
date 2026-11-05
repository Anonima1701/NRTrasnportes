
/* ==========================================
   NR TRANSPORTES - JAVASCRIPT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. MENU RESPONSIVO
    // ======================================

    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector("#mainNav");

    if (menuToggle && mainNav) {

        function fecharMenu() {
            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        }

        menuToggle.addEventListener("click", () => {

            const aberto = mainNav.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(aberto));

            menuToggle.innerHTML = aberto
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                fecharMenu();
            }
        });
    }


    // ======================================
    // 2. SELEÇÃO DE VEÍCULOS
    // ======================================

    const botoesVeiculos = document.querySelectorAll(
        "[data-veiculo]"
    );

    const campoVeiculo = document.querySelector("#veiculo");

    botoesVeiculos.forEach(botao => {

        botao.addEventListener("click", () => {

            const veiculo = botao.dataset.veiculo;

            if (campoVeiculo) {
                campoVeiculo.value = veiculo;
            }

            botoesVeiculos.forEach(item => {
                item.classList.remove("selecionado");
            });

            botao.classList.add("selecionado");

            document.querySelector("#orcamento")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        });
    });


    // ======================================
    // 3. FORMULÁRIO DE ORÇAMENTO
    // ======================================

    const formulario = document.querySelector("#formOrcamento");

    if (formulario) {

        formulario.addEventListener("submit", (event) => {

            event.preventDefault();

            if (!formulario.reportValidity()) {
                return;
            }

            const nome = document.querySelector("#nome")
                ?.value.trim() || "";

            const origem = document.querySelector("#origem")
                ?.value.trim() || "";

            const destino = document.querySelector("#destino")
                ?.value.trim() || "";

            const data = document.querySelector("#data")
                ?.value || "";

            const passageiros = Number(
                document.querySelector("#passageiros")?.value
            );

            const veiculo = document.querySelector("#veiculo")
                ?.value || "Sem preferência";

            const pagamento = document.querySelector("#pagamento")
                ?.value || "A combinar";

            if (!nome || !origem || !destino || !data ||
                !Number.isInteger(passageiros) || passageiros < 1) {

                alert("Preencha corretamente os dados da viagem.");
                return;
            }

            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);

            const dataViagem = new Date(data + "T00:00:00");

            if (dataViagem < hoje) {
                alert("Escolha uma data atual ou futura.");
                return;
            }

            const dataFormatada = dataViagem.toLocaleDateString(
                "pt-BR"
            );

            const mensagem =
`Olá! Gostaria de solicitar um orçamento na NR Transportes.

Nome: ${nome}
Origem: ${origem}
Destino: ${destino}
Data: ${dataFormatada}
Quantidade de passageiros: ${passageiros}
Veículo: ${veiculo}
Preferência de pagamento: ${pagamento}

Aguardo o orçamento e a confirmação de disponibilidade.`;

            const telefone = "5598982290235";

            const link = "https://wa.me/" + telefone +
                "?text=" + encodeURIComponent(mensagem);

            window.open(link, "_blank", "noopener,noreferrer");

        });
    }


    // ======================================
    // 4. SIMULADOR DE PAGAMENTO
    // ======================================

    const campoValor = document.querySelector("#valorOrcamento");
    const resultadoPagamento = document.querySelector(
        "#resultadoPagamento"
    );

    const formatarMoeda = (valor) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    };

    if (campoValor && resultadoPagamento) {

        campoValor.addEventListener("input", () => {

            const valor = Number(campoValor.value);

            if (!Number.isFinite(valor) || valor <= 0) {
                resultadoPagamento.textContent =
                    "Informe um valor válido.";
                return;
            }

            const entrada = valor * 0.5;
            const restante = valor - entrada;

            resultadoPagamento.innerHTML = `
                <p>Valor total: <strong>${formatarMoeda(valor)}</strong></p>
                <p>Entrada de 50%: <strong>${formatarMoeda(entrada)}</strong></p>
                <p>Valor restante: <strong>${formatarMoeda(restante)}</strong></p>
            `;
        });
    }


    // ======================================
    // 5. PERGUNTAS FREQUENTES
    // ======================================

    const perguntas = document.querySelectorAll(".faq-pergunta");

    perguntas.forEach(pergunta => {

        pergunta.addEventListener("click", () => {

            const resposta = pergunta.nextElementSibling;

            if (!resposta) return;

            const aberta = !resposta.hidden;

            resposta.hidden = aberta;

            pergunta.setAttribute(
                "aria-expanded",
                String(!aberta)
            );
        });
    });


    // ======================================
    // 6. BOTÃO VOLTAR AO TOPO
    // ======================================

    const botaoTopo = document.querySelector("#voltarTopo");

    if (botaoTopo) {

        botaoTopo.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ======================================
    // 7. DATA MÍNIMA DO FORMULÁRIO
    // ======================================

    const campoData = document.querySelector("#data");

    if (campoData) {

        const agora = new Date();

        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const dia = String(agora.getDate()).padStart(2, "0");

        campoData.min = `${ano}-${mes}-${dia}`;
    }

});
