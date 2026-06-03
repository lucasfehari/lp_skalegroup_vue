<template>
  <div class="landing-page">
    <!-- CABEÇALHO (HEADER) -->
    <header class="site-header">
      <div class="container header-container">
        <a href="#" class="logo" aria-label="Skale Digital Home">
          <div class="logo-icon" aria-hidden="true">
            <div class="logo-shape-1"></div>
            <div class="logo-shape-2"></div>
          </div>
          <div class="logo-text">
            Skale
            <span>Digital</span>
          </div>
        </a>
        <div class="header-actions">
          <button class="header-pill" aria-label="Status das vagas">Vagas Abertas</button>
          <div class="header-circle" aria-hidden="true" title="Perfil/Menu"></div>
        </div>
      </div>
    </header>

    <!-- SEÇÃO 1: HERO (Copy + Visual lado a lado) -->
    <section class="hero-section" id="hero">
      <div class="container hero-grid">
        <!-- Hero Left: Copy -->
        <div class="hero-content">
          <span class="hero-tag">Assessoria de marketing especializada em delivery</span>
          <h1 class="hero-title text-gradient">
            Pare de torcer pra ser um mês bom. Tenha um delivery que vende com previsibilidade, porque tudo é medido.
          </h1>
          <p class="hero-description">
            No delivery, cada pedido deixa rastro. A Skale usa esse dado pra fazer seu delivery vender mais, com mais recorrência e sem depender de promoção no iFood.
          </p>
          <button @click="scrollToForm" class="btn-primary" aria-label="Ir para formulário de qualificação">
            Quero escalar meu delivery
          </button>
        </div>

        <!-- Hero Right: Medição Visual e Social Proof Rápido -->
        <div class="hero-visual">
          <div class="glass-card metric-visual-card">
            <div class="mockup-header">
              <div class="mockup-dot"></div>
              <div class="mockup-dot"></div>
              <div class="mockup-dot"></div>
              <span class="mockup-title">skale_tracker_v3.bin</span>
            </div>
            <div class="metric-chart">
              <div class="chart-bar" style="height: 35%;"></div>
              <div class="chart-bar" style="height: 55%;"></div>
              <div class="chart-bar" style="height: 48%;"></div>
              <div class="chart-bar" style="height: 75%;"></div>
              <div class="chart-bar" style="height: 95%;"></div>
            </div>
            <p class="visual-quote">
              Você sabe quanto investiu, quanto voltou e de onde veio cada venda. Mais de 50 deliverys já escalados com a gente.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FORMULÁRIO DE QUALIFICAÇÃO (Directly below Hero content) -->
    <section class="section-padding" id="form-section">
      <div class="container">
        <h2 class="form-section-title">Preencha nosso form:</h2>
        
        <div class="glass-card form-card">
          <!-- State 1: Formulário Ativo -->
          <form v-if="!submitted" @submit.prevent="submitForm" class="form-grid">
            <!-- Nome -->
            <div class="form-group">
              <label for="name" class="form-label">Nome:</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                placeholder="Seu nome completo" 
                class="form-input"
              />
            </div>

            <!-- Faturamento Mensal (Dropdown / Radio Selector) -->
            <div class="form-group">
              <label class="form-label">Faturamento mensal:</label>
              <div class="pill-selector">
                <label class="pill-option">
                  <input type="radio" v-model="form.revenue" value="Abaixo de 50k" required />
                  <span class="pill-label">Abaixo de 50 mil</span>
                </label>
                <label class="pill-option">
                  <input type="radio" v-model="form.revenue" value="50k a 100k" />
                  <span class="pill-label">50 a 100 mil</span>
                </label>
                <label class="pill-option">
                  <input type="radio" v-model="form.revenue" value="100k a 200k" />
                  <span class="pill-label">100 a 200 mil</span>
                </label>
                <label class="pill-option">
                  <input type="radio" v-model="form.revenue" value="Acima de 200k" />
                  <span class="pill-label">Acima de 200 mil</span>
                </label>
              </div>
            </div>

            <!-- WhatsApp -->
            <div class="form-group">
              <label for="whatsapp" class="form-label">WhatsApp:</label>
              <input 
                type="tel" 
                id="whatsapp" 
                v-model="form.whatsapp" 
                required 
                placeholder="(00) 00000-0000" 
                class="form-input"
              />
            </div>

            <!-- Pergunta qualificatória -->
            <div class="form-group">
              <label class="form-label">Pergunta qualificatória:</label>
              <p style="font-size: 0.85rem; color: var(--grey-text); line-height: 1.4;">
                Você está disposto a investir mais de R$ 3.000 por mês (ou de 1% a 3% do seu faturamento bruto) no marketing do seu delivery?
              </p>
              <div class="qualify-switcher">
                <button 
                  type="button" 
                  @click="form.willInvest = true" 
                  :class="['switch-btn', { 'active-sim': form.willInvest === true }]"
                >
                  Sim
                </button>
                <button 
                  type="button" 
                  @click="form.willInvest = false" 
                  :class="['switch-btn', { 'active-nao': form.willInvest === false }]"
                >
                  Não
                </button>
              </div>
            </div>

            <!-- Nome do delivery -->
            <div class="form-group">
              <label for="delivery-name" class="form-label">Nome do delivery:</label>
              <input 
                type="text" 
                id="delivery-name" 
                v-model="form.deliveryName" 
                required 
                placeholder="Ex: Brabos Lanches" 
                class="form-input"
              />
            </div>

            <!-- Botão de Envio e Microcopy -->
            <div class="form-group full-width form-footer">
              <button type="submit" class="btn-primary">
                Quero escalar meu delivery
              </button>
              <div class="form-microcopy">
                <span class="microcopy-line">Vagas limitadas por mês.</span>
                <span class="microcopy-line">Retorno em até 24h.</span>
              </div>
            </div>
          </form>

          <!-- State 2: Sucesso do Envio -->
          <div v-else style="text-align: center; padding: 2rem 0;" class="fade-in">
            <div class="deliver-icon" style="margin: 0 auto 1.5rem auto; width: 64px; height: 64px; font-size: 2rem;">✓</div>
            <h3 style="font-size: 1.75rem; margin-bottom: 0.5rem;" class="text-gradient">Recebemos seus dados!</h3>
            <p style="color: var(--grey-text); max-width: 500px; margin: 0 auto 2rem auto;">
              Obrigado, <strong style="color: var(--white);">{{ form.name }}</strong>. Analisamos o perfil do seu delivery <strong style="color: var(--white);">{{ form.deliveryName }}</strong>. Em até 24 horas um especialista entrará em contato via WhatsApp no número <strong style="color: var(--white);">{{ form.whatsapp }}</strong>.
            </p>
            <button @click="resetForm" class="header-pill" style="cursor: pointer;">Preencher novamente</button>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 2: PROVA SOCIAL (Faixa de logos) -->
    <section class="ticker-section">
      <h2 class="ticker-title">Mais de 50 deliverys já confiaram na Skale</h2>
      
      <!-- Ticker Marquee Rolante -->
      <div class="ticker-container">
        <div class="ticker-track">
          <!-- Logo 1: Brabos -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 22h20L12 2zm0 3.8L18.5 19H5.5L12 5.8z"/></svg>
            Brabos Lanches
          </div>
          <!-- Logo 2: Claude -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            Claude Restaurante
          </div>
          <!-- Logo 3: BB Lanches -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            BB Lanches
          </div>
          <!-- Logo 4: João Restaurante -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            João Restaurante
          </div>
          <!-- Logo 5: Dona Pizza -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            Dona Pizza
          </div>

          <!-- Ticker Duplicado para Scroll Infinito -->
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 22h20L12 2zm0 3.8L18.5 19H5.5L12 5.8z"/></svg>
            Brabos Lanches
          </div>
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            Claude Restaurante
          </div>
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            BB Lanches
          </div>
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" stroke="currentColor" stroke-width="2" fill="none"/></svg>
            João Restaurante
          </div>
          <div class="ticker-item">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            Dona Pizza
          </div>
        </div>
      </div>

      <p class="ticker-subtext">
        De operações começando a deliverys faturando seis dígitos por mês. A gente já passou por isso.
      </p>
    </section>

    <!-- SEÇÃO 3: A DOR (Identificação) -->
    <section class="section-padding pain-section">
      <div class="container pain-grid">
        <div class="pain-sticky">
          <span class="hero-tag">Sintomas comuns</span>
          <h2 class="pain-title text-gradient">Se você toca um delivery, provavelmente já viveu isso:</h2>
        </div>
        
        <div class="pain-cards">
          <!-- Dor 1 -->
          <div class="glass-card pain-card">
            <h3>Instabilidade Previsível</h3>
            <p>Um mês explode de pedido, no outro despenca, e você não sabe explicar o motivo.</p>
          </div>
          <!-- Dor 2 -->
          <div class="glass-card pain-card">
            <h3>Refém do iFood</h3>
            <p>Cortou a promoção de entrega grátis ou cupom, o pedido sumiu. A sua margem foi embora.</p>
          </div>
          <!-- Dor 3 -->
          <div class="glass-card pain-card">
            <h3>Dinheiro jogado fora</h3>
            <p>Joga orçamento no botão "impulsionar" do Instagram e não faz a mínima ideia de quanto de faturamento voltou.</p>
          </div>
          <!-- Dor 4 -->
          <div class="glass-card pain-card">
            <h3>Sem fidelidade de clientes</h3>
            <p>Tem cliente que pede uma única vez no seu delivery por cupom e nunca mais volta a comprar.</p>
          </div>
          <!-- Dor 5 -->
          <div class="glass-card pain-card">
            <h3>Rodando no lugar</h3>
            <p>Você vende muito, mas o caixa não sobra. A operação roda no mesmo lugar há meses sem crescer.</p>
          </div>

          <div class="pain-footer">
            <p>
              Nada disso é falta de produto bom. É falta de uma <strong>estrutura de marketing que use os seus dados</strong> pra vender todo mês, e não só quando dá sorte.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 4: POR QUE DELIVERY (Diferencial de dados) -->
    <section class="section-padding split-section">
      <div class="container split-grid">
        <div>
          <span class="hero-tag">A diferença está no rastro</span>
          <h2 class="split-title text-gradient">No delivery, a gente não chuta. A gente mede.</h2>
          <p class="split-text">
            Diferente de marketing solto por aí, no delivery cada pedido gera dado: quem comprou, quanto gastou, quando volta. É isso que deixa a gente fazer marketing que se paga e escala.
          </p>
          <p class="split-text">
            A gente trabalha recorrência, monta CRM e acompanha cada real investido. Você não aposta. Você acompanha o resultado acontecendo.
          </p>
          <div class="split-stats">
            <div class="stat-item">
              <h4>100%</h4>
              <p>Mapeado</p>
            </div>
            <div class="stat-item">
              <h4>3.5x</h4>
              <p>ROAS médio</p>
            </div>
          </div>
        </div>

        <div class="split-visual">
          <div class="dashboard-mockup">
            <div class="mockup-header">
              <div class="mockup-dot"></div>
              <div class="mockup-dot"></div>
              <div class="mockup-dot"></div>
              <span class="mockup-title">dashboard_live.json</span>
            </div>
            <div class="mockup-row">
              <span>Investimento de Marketing</span>
              <span class="mockup-val">R$ 4.250,00</span>
            </div>
            <div class="mockup-row">
              <span>Vendas Diretas</span>
              <span class="mockup-val positive">R$ 18.910,00</span>
            </div>
            <div class="mockup-row">
              <span>Pedidos Recorrentes</span>
              <span class="mockup-val">42%</span>
            </div>
            <div class="mockup-row">
              <span>Custo por Aquisição (CAC)</span>
              <span class="mockup-val" style="color: #ef4444;">R$ 8,12</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 5: QUEBRA DE OBJEÇÃO (Skale vs Agência) -->
    <section class="section-padding split-section">
      <div class="container split-grid reverse">
        <div class="split-visual">
          <div class="dashboard-mockup" style="border-color: rgba(244, 63, 94, 0.2);">
            <div class="mockup-header">
              <span class="mockup-title" style="color: var(--primary-red); font-weight: 600;">SQUAD DEDICADO SKALE</span>
            </div>
            <div class="mockup-row">
              <span>Análise de CRM Diária</span>
              <span class="mockup-val" style="color: #10b981;">✓ Sim</span>
            </div>
            <div class="mockup-row">
              <span>Relatório de Margem e ROAS</span>
              <span class="mockup-val" style="color: #10b981;">✓ Semanal</span>
            </div>
            <div class="mockup-row">
              <span>Foco Exclusivo em Delivery</span>
              <span class="mockup-val" style="color: #10b981;">✓ Sim</span>
            </div>
            <div class="mockup-row">
              <span>Criativos baseados em Conversão</span>
              <span class="mockup-val" style="color: #10b981;">✓ Sim</span>
            </div>
          </div>
        </div>

        <div>
          <span class="hero-tag">Chega de amadorismo</span>
          <h2 class="split-title text-gradient">Nada de agência que some depois do contrato.</h2>
          <p class="split-text">
            A gente não é freelancer que entrega post bonito e desaparece. A Skale é especializada só em delivery, com time dedicado e relatório de resultado toda semana.
          </p>
          <p class="split-text">
            Investimento, pedidos, ticket médio, ROAS e recorrência, tudo na mesa. Você nunca fica no escuro sobre pra onde tá indo o seu dinheiro.
          </p>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 6: O QUE A GENTE ENTREGA (Resultado, não tarefa) -->
    <section class="section-padding deliver-section">
      <div class="container">
        <div class="section-header">
          <span class="hero-tag">Entregáveis de Alto Nível</span>
          <h2>O que muda no seu delivery com a Skale</h2>
          <p>Nosso foco está no crescimento da sua receita e do seu lucro líquido, não em curtidas.</p>
        </div>

        <div class="deliver-grid">
          <!-- Item 1 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">📈</div>
            <h3>Vendas previsíveis</h3>
            <p>Estratégia de marketing digital orientada por dados de pedidos e conversão, mitigando a dependência do acaso.</p>
          </div>
          <!-- Item 2 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">📱</div>
            <h3>Menos dependência de iFood</h3>
            <p>Criação e escalada de canais próprios (site, app, WhatsApp) que vendem sem taxas absurdas comendo sua margem.</p>
          </div>
          <!-- Item 3 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">🔄</div>
            <h3>Mais recorrência</h3>
            <p>Campanhas inteligentes integradas ao seu CRM para fazer o mesmo cliente comprar novamente em menos tempo.</p>
          </div>
          <!-- Item 4 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">🚀</div>
            <h3>Tráfego pago especializado</h3>
            <p>Anúncios em Meta e Google focados no público de delivery e de geolocalização exata, geridos por especialistas.</p>
          </div>
          <!-- Item 5 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">📊</div>
            <h3>Relatório claro toda semana</h3>
            <p>Você acompanha de forma descomplicada exatamente quanto investiu em anúncios e quanto obteve em faturamento real.</p>
          </div>
          <!-- Item 6 -->
          <div class="glass-card deliver-card">
            <div class="deliver-icon" aria-hidden="true">🎯</div>
            <h3>Crescimento que escala</h3>
            <p>Otimização contínua: quanto mais dados nós medimos e acumulamos, mais assertiva se torna a alocação de verba.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 7: DEPOIMENTOS / CASE GRID -->
    <section class="section-padding cases-section">
      <div class="container">
        <div class="section-header">
          <span class="hero-tag">Cases de sucesso</span>
          <h2>Quem já escalou com a gente fala melhor que qualquer promessa</h2>
        </div>

        <div class="cases-grid">
          <!-- Case 1: Brabos Lanches -->
          <div class="case-card">
            <div class="case-content">
              <div>
                <h3 class="case-title">Brabos Lanches</h3>
                <p class="case-description">Depois de contratarem o Skale Group, a operação atingiu um patamar estável de vendas mensais.</p>
              </div>
              <div class="case-stat">
                <div class="case-stat-val">+ R$ 200k</div>
                <div class="case-stat-lbl">Faturamento Mensal</div>
              </div>
              <div class="case-arrow" aria-hidden="true">↗</div>
            </div>
            <div class="case-image" style="background-image: url('/images/case-brabos.png')" role="img" aria-label="Brabos Lanches fachada do restaurante"></div>
          </div>

          <!-- Case 2: Claude Restaurante -->
          <div class="case-card">
            <div class="case-content">
              <div>
                <h3 class="case-title">Claude Restaurante</h3>
                <p class="case-description">Margem de lucro otimizada e forte canal de vendas direto via WhatsApp.</p>
              </div>
              <div class="case-stat">
                <div class="case-stat-val">+ R$ 250k</div>
                <div class="case-stat-lbl">Faturamento Mensal</div>
              </div>
              <div class="case-arrow" aria-hidden="true">↗</div>
            </div>
            <div class="case-image" style="background-image: url('/images/case-claude.png')" role="img" aria-label="Claude Restaurante cozinha em funcionamento"></div>
          </div>

          <!-- Case 3: BB Lanches -->
          <div class="case-card">
            <div class="case-content">
              <div>
                <h3 class="case-title">BB Lanches</h3>
                <p class="case-description">Escala de pedidos com redução de 30% na taxa média de marketing do iFood.</p>
              </div>
              <div class="case-stat">
                <div class="case-stat-val">+ R$ 220k</div>
                <div class="case-stat-lbl">Faturamento Mensal</div>
              </div>
              <div class="case-arrow" aria-hidden="true">↗</div>
            </div>
            <div class="case-image" style="background-image: url('/images/case-bb.png')" role="img" aria-label="BB Lanches balcão de lanches rápido"></div>
          </div>

          <!-- Case 4: João Restaurante -->
          <div class="case-card">
            <div class="case-content">
              <div>
                <h3 class="case-title">João Restaurante</h3>
                <p class="case-description">Campanha de geolocalização e CRM com retorno recorde sobre o investimento.</p>
              </div>
              <div class="case-stat">
                <div class="case-stat-val">+ R$ 310k</div>
                <div class="case-stat-lbl">Faturamento Mensal</div>
              </div>
              <div class="case-arrow" aria-hidden="true">↗</div>
            </div>
            <div class="case-image" style="background-image: url('/images/case-joao.png')" role="img" aria-label="João Restaurante área de refeições no jardim"></div>
          </div>
        </div>

        <div class="cases-cta">
          <button @click="scrollToForm" class="btn-primary" aria-label="Ir para formulário de qualificação">
            Quero ser o próximo resultado
          </button>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 8: COMO FUNCIONA (PASSOS) -->
    <section class="section-padding steps-section">
      <div class="container">
        <div class="section-header">
          <span class="hero-tag">Fluxo descomplicado</span>
          <h2>Simples de começar</h2>
          <p>Três etapas simples para começar a rodar a sua máquina de vendas com dados</p>
        </div>

        <div class="steps-grid">
          <!-- Passo 1 -->
          <div class="step-item">
            <div class="step-num">01</div>
            <h3>Preencha o formulário</h3>
            <p>Conte um pouco sobre o momento atual do seu delivery. Leva menos de 1 minuto e os dados estão seguros.</p>
          </div>
          <!-- Passo 2 -->
          <div class="step-item">
            <div class="step-num">02</div>
            <h3>Fale com especialista</h3>
            <p>Em até 24 horas úteis, um especialista em escala de delivery te chamará para entender se a assessoria cabe na sua operação.</p>
          </div>
          <!-- Passo 3 -->
          <div class="step-item">
            <div class="step-num">03</div>
            <h3>Venda com previsibilidade</h3>
            <p>Estruturamos as suas tags, CRM e campanhas de anúncios. Nós executamos e medimos, você gerencia a cozinha.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO 9: ESCASSEZ + CTA FINAL -->
    <section class="section-padding cta-section">
      <div class="container">
        <div class="glass-card cta-card">
          <span class="hero-tag">Acesso restrito</span>
          <h2>A gente não pega delivery demais ao mesmo tempo.</h2>
          <p>
            Para entregar resultado de verdade e acompanhar o dado de perto, trabalhamos com um número limitado de deliverys por mês. Se o seu já fatura acima de 50 mil e tá pronto pra escalar com previsibilidade, garanta seu lugar agora.
          </p>
          <button @click="scrollToForm" class="btn-primary" aria-label="Garantir vaga no formulário">
            Quero uma das vagas deste mês
          </button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="site-footer">
      <div class="container">
        <div class="site-footer-logo">
          <div class="logo-icon" aria-hidden="true" style="width: 24px; height: 24px;">
            <div class="logo-shape-1" style="width: 12px; height: 18px; left: 1px; top: 3px;"></div>
            <div class="logo-shape-2" style="width: 9px; height: 14px; right: 1px; top: 6px;"></div>
          </div>
          <span style="font-family: var(--font-title); font-weight: 800; font-size: 1.25rem;">Skale</span>
        </div>
        <p>&copy; 2026 Skale Digital assessoria de marketing Ltda. Todos os direitos reservados.</p>
        <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.5;">
          Desenvolvido com carinho profissional para alta performance de conversão de leads.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Estado reativo do formulário
const form = ref({
  name: '',
  revenue: '50k a 100k', // Valor padrão selecionado
  whatsapp: '',
  willInvest: true, // Valor padrão Sim
  deliveryName: ''
})

const submitted = ref(false)

// Manipulador do envio do formulário
const submitForm = () => {
  // Simular processamento/envio de lead para a Skale
  console.log('Dados do lead enviados:', form.value)
  submitted.value = true
}

// Reset do formulário
const resetForm = () => {
  form.value = {
    name: '',
    revenue: '50k a 100k',
    whatsapp: '',
    willInvest: true,
    deliveryName: ''
  }
  submitted.value = false
}

// Função utilitária para rolar suavemente até o formulário
const scrollToForm = () => {
  const el = document.getElementById('form-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Transição rápida de fade-in para a mensagem de sucesso */
.fade-in {
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
