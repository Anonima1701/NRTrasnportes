
/* ==========================================
   NR TRANSPORTES - JAVASCRIPT CORRIGIDO
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

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

        menuToggle.addEventListener("click", function () {

            const aberto = mainNav.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(aberto)
            );

            menuToggle.innerHTML = aberto
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", fecharMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                fecharMenu();
            }
        });
    }


    // ======================================
    // 2. SELEÇÃO DAS VANS
    // ======================================

    const botoesVan = document.querySelectorAll(".escolher-van");
    const campoVeiculo = document.querySelector("#veiculo");

    botoesVan.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const vanSelecionada = botao.dataset.van;

            if (campoVeiculo) {
                campoVeiculo.value = vanSelecionada;
            }

            botoesVan.forEach(function (item) {
                item.classList.remove("selecionado");
                item.setAttribute("aria-pressed", "false");
            });

            botao.classList.add("selecionado");
            botao.setAttribute("aria-pressed", "true");

            document.querySelector("#orcamento")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        });
    });


    // ======================================
    // 3. FORMULÁRIO DE ORÇAMENTO
    // ======================================

    const formulario = document.querySelector("#quoteForm");
    const campoData = document.querySelector("#dataViagem");
    const feedback = document.querySelector("#quoteFeedback");

    // Data atual no formato YYYY-MM-DD
    function obterDataAtual() {

        const hoje = new Date();

        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    if (campoData) {
        campoData.min = obterDataAtual();
    }

    if (formulario) {

        formulario.addEventListener("submit", function (event) {

            event.preventDefault();

            // Atualiza a data mínima
            if (campoData) {
                campoData.min = obterDataAtual();
            }

            // Validação do formulário
            if (!formulario.reportValidity()) {
                return;
            }

            // ======================================
            // 4. CAPTURA DOS DADOS
            // ======================================

            const nome = document.querySelector("#cliente")
                .value.trim();

            const origem = document.querySelector("#origem")
                .value.trim();

            const destino = document.querySelector("#destino")
                .value.trim();

            const data = document.querySelector("#dataViagem")
                .value;

            const horario = document.querySelector("#horaViagem")
                .value;

            const passageiros = Number(
                document.querySelector("#passageiros").value
            );

            const veiculo = document.querySelector("#veiculo")
                .value;

            const pagamento = document.querySelector("#formaPagamento")
                .value;

            const observacoes = document.querySelector("#observacoes")
                .value.trim();


            // ======================================
            // 5. VALIDAÇÃO DOS DADOS
            // ======================================

            if (!nome || !origem || !destino ||
                !data || !horario || !veiculo) {

                if (feedback) {
                    feedback.textContent =
                        "Preencha todos os campos obrigatórios.";
                }

                return;
            }

            if (!Number.isInteger(passageiros) ||
                passageiros < 1 || passageiros > 99) {

                if (feedback) {
                    feedback.textContent =
                        "Informe uma quantidade válida de passageiros.";
                }

                return;
            }

            if (data < obterDataAtual()) {

                if (feedback) {
                    feedback.textContent =
                        "A data da viagem não pode estar no passado.";
                }

                return;
            }


            // ======================================
            // 6. FORMATAÇÃO DA DATA
            // ======================================

            const partesData = data.split("-");

            const dataFormatada =
                `${partesData[2]}/${partesData[1]}/${partesData[0]}`;


            // ======================================
            // 7. MENSAGEM PARA O WHATSAPP
            // ======================================

            const mensagem =
`Olá! Gostaria de solicitar um orçamento na NR Transportes.

*DADOS DO CLIENTE*
Nome: ${nome}

*INFORMAÇÕES DA VIAGEM*
Origem: ${origem}
Destino: ${destino}
Data: ${dataFormatada}
Horário de saída: ${horario}
Quantidade de passageiros: ${passageiros}
Veículo de preferência: ${veiculo}

*PAGAMENTO*
Preferência: ${pagamento}

*OBSERVAÇÕES*
${observacoes || "Nenhuma observação."}

Aguardo o orçamento e a confirmação da disponibilidade.

Obrigado!`;


            // ======================================
            // 8. INTEGRAÇÃO COM WHATSAPP
            // ======================================

            // Número da NR Transportes
            // Formato: código do país + DDD + número
            const telefone = "5598982290235";

            const linkWhatsApp =
                "https://wa.me/" + telefone +
                "?text=" + encodeURIComponent(mensagem);

            if (feedback) {
                feedback.textContent =
                    "Abrindo o WhatsApp com os dados do orçamento...";
            }

            // Abre o WhatsApp
            window.location.href = linkWhatsApp;

        });
    }


    // ======================================
    // 9. SIMULADOR DE PAGAMENTO
    // ======================================

    const campoValor = document.querySelector("#valorOrcamento");

    const valorEntrada = document.querySelector("#valorEntrada");
    const valorRestante = document.querySelector("#valorRestante");
    const valorTotal = document.querySelector("#valorTotal");

    function formatarMoeda(valor) {

        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    if (campoValor && valorEntrada &&
        valorRestante && valorTotal) {

        campoValor.addEventListener("input", function () {

            const valor = Number(campoValor.value);

            if (!Number.isFinite(valor) || valor <= 0) {

                valorEntrada.textContent = formatarMoeda(0);
                valorRestante.textContent = formatarMoeda(0);
                valorTotal.textContent = formatarMoeda(0);

                return;
            }

            const entrada = valor * 0.5;
            const restante = valor - entrada;

            valorEntrada.textContent = formatarMoeda(entrada);
            valorRestante.textContent = formatarMoeda(restante);
            valorTotal.textContent = formatarMoeda(valor);
        });
    }

});
