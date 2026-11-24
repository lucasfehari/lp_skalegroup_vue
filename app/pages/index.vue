<template>
  <div class="lp">

    <SiteHeader />

    <!-- ============================================================
         HERO
    ============================================================ -->
    <section class="hero section" id="hero" aria-labelledby="hero-title">
      <div class="video-bg">
        <video autoplay muted loop playsinline>
          <source src="/videos/bgvideoskale.mp4" type="video/mp4">
        </video>
      </div>
      <div class="container hero__inner">
        <div class="hero__copy">
          <div class="hero__eyebrow">
            <span class="badge">Assessoria especializada em delivery</span>
          </div>

          <h1 id="hero-title" class="hero__title">
            Mais pedidos no seu delivery,<br>
            com um sistema que funciona sozinho.
          </h1>

          <p class="hero__sub">
            A Skale conecta tráfego, CRM, tecnologia e IA para fazer seu delivery vender
            mais — sem você precisar aprender ferramenta nenhuma.
          </p>
        </div>

        <div class="hero__form" id="form-section">
          <div class="form-wrap">
            <form v-if="!submitted" @submit.prevent="submitForm" class="form" novalidate>

              <!-- Linha 1: Nome + WhatsApp -->
              <div class="form__row">
                <div class="form__field">
                  <label for="name" class="form__label">Nome</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    placeholder="Seu nome completo"
                    class="form__input"
                    autocomplete="name"
                  />
                </div>

                <div class="form__field">
                  <label for="email" class="form__label">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    placeholder="example@email.com"
                    class="form__input"
                    autocomplete="email"
                  />
                </div>
                <div class="form__field">
                  <label for="whatsapp" class="form__label">WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    v-model="form.whatsapp"
                    required
                    placeholder="(00) 00000-0000"
                    class="form__input"
                    autocomplete="tel"
                  />
                </div>
              </div>

              <!-- Nome do delivery -->
              <div class="form__field">
                <label for="delivery-name" class="form__label">Nome do delivery</label>
                <input
                  type="text"
                  id="delivery-name"
                  v-model="form.deliveryName"
                  required
                  placeholder="Ex: Brabos Lanches"
                  class="form__input"
                />
              </div>

              <!-- Faturamento Mensal (Custom Dropdown) -->
              <div class="form__field">
                <span class="form__label">Faturamento mensal atual</span>
                <div class="custom-dropdown" :class="{ 'custom-dropdown--open': isRevenueDropdownOpen }">
                  <div class="custom-dropdown__trigger form__input" @click="toggleRevenueDropdown">
                    <span class="custom-dropdown__selected" :style="{ color: form.revenue ? 'var(--white)' : 'var(--grey-dark)' }">
                      {{ revenueOptions.find(opt => opt.value === form.revenue)?.label || 'Selecione...' }}
                    </span>
                    <svg class="custom-dropdown__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <ul class="custom-dropdown__menu" v-show="isRevenueDropdownOpen">
                    <li
                      v-for="opt in revenueOptions"
                      :key="opt.value"
                      @click="selectRevenue(opt.value)"
                      :class="['custom-dropdown__item', { 'custom-dropdown__item--selected': form.revenue === opt.value }]"
                    >
                      {{ opt.label }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Investimento -->
              <div class="form__field">
                <span class="form__label">Você toparia investir acima de R$ 3.000/mês em marketing?</span>
                <p class="form__hint">Ou de 1% a 3% do seu faturamento bruto</p>
                <div class="toggle-group">
                  <button
                    type="button"
                    @click="form.willInvest = true"
                    :class="['toggle-btn', { 'toggle-btn--active': form.willInvest === true }]"
                    :aria-pressed="form.willInvest === true"
                  >
                    Sim, topo
                  </button>
                  <button
                    type="button"
                    @click="form.willInvest = false"
                    :class="['toggle-btn', { 'toggle-btn--no': form.willInvest === false }]"
                    :aria-pressed="form.willInvest === false"
                  >
                    Ainda não
                  </button>
                </div>
              </div>

              <!-- Submit -->
              <div class="form__footer">
                <button type="submit" class="btn btn--primary btn--lg">
                  Quero escalar meu delivery
                  <svg class="btn__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="form__trust">
                  <span>Diagnóstico sem compromisso</span>
                  <span class="form__trust-dot" aria-hidden="true">·</span>
                  <span>Retorno em até 24h</span>
                  <span class="form__trust-dot" aria-hidden="true">·</span>
                  <span>Dados seguros</span>
                </div>
              </div>

            </form>

            <!-- Estado de sucesso -->
            <div v-else class="form-success fade-in">
              <div class="form-success__icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M6 16l7 7 13-13" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="form-success__title">Recebemos seus dados.</h3>
              <p class="form-success__text">
                Obrigado, <strong>{{ form.name }}</strong>. Analisamos o perfil do
                <strong>{{ form.deliveryName }}</strong> e retornamos via WhatsApp
                <strong>{{ form.whatsapp }}</strong> em até 24 horas.
              </p>
              <button @click="resetForm" class="btn btn--ghost btn--sm">
                Preencher novamente
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- linha decorativa horizontal -->
      <div class="hero__rule" aria-hidden="true"></div>
    </section>

    <!-- ============================================================
         CLIENTES — PROVA SOCIAL LOGO APÓS O HERO
    ============================================================ -->
    <section class="client-wall" aria-labelledby="client-wall-title">
      <div class="container client-wall__inner">
        <div class="client-wall__heading">
          <div>
            <span class="eyebrow">Clientes</span>
            <h2 id="client-wall-title">Marcas que já colocaram o Sistema Skale para rodar.</h2>
          </div>
          <span class="client-wall__count">{{ clientLogos.length }} marcas</span>
        </div>
        <ul class="client-wall__grid" aria-label="Clientes da Skale Digital">
          <li v-for="client in clientLogos" :key="client.name" class="client-logo">
            <img :src="client.src" :alt="client.name" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <!-- ============================================================
         SISTEMA SKALE — NOVA SEGUNDA DOBRA COMPLETA
    ============================================================ -->
    <section id="sistema-skale" class="section system-section" aria-labelledby="system-title">
      <div class="container">
        <div class="system-section__header">
          <div>
            <span class="eyebrow eyebrow--light">O que a Skale faz</span>
            <h2 id="system-title" class="section-title">Crescimento não é uma campanha.<br>É um sistema.</h2>
          </div>
          <p>
            A estratégia, a tecnologia e a rotina de análise trabalham juntas. Você
            acompanha pedidos e faturamento; a complexidade fica com a gente.
          </p>
        </div>

        <div class="system-grid">
          <article class="system-card">
            <span class="system-card__num">01</span>
            <h3>Mais vendas</h3>
            <p>Tráfego pago, CRM e reativação para conquistar clientes e fazê-los comprar de novo.</p>
          </article>
          <article class="system-card system-card--bright">
            <span class="system-card__num">02</span>
            <h3>Tecnologia sem burocracia</h3>
            <p>IA e automações cuidam de relatórios, campanhas e oportunidades nos bastidores.</p>
          </article>
          <article class="system-card">
            <span class="system-card__num">03</span>
            <h3>Rotina que funciona</h3>
            <p>Leitura, decisão e ajuste toda semana. Um processo constante, não ações soltas.</p>
          </article>
        </div>

        <div class="system-method" aria-label="Etapas do Sistema Skale">
          <span>Diagnóstico</span>
          <i aria-hidden="true">→</i>
          <span>Aquisição</span>
          <i aria-hidden="true">→</i>
          <span>Conversão</span>
          <i aria-hidden="true">→</i>
          <span>Recompra</span>
          <i aria-hidden="true">→</i>
          <span>Escala</span>
        </div>
      </div>
    </section>

    <!-- ============================================================
         TICKER — SOCIAL PROOF
    ============================================================ -->
    <!--
    <div class="ticker" aria-label="Clientes Skale Digital">
      <div class="ticker__track" aria-hidden="true">
        <span class="ticker__item">Brabos Lanches</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Claude Restaurante</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">BB Lanches</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">João Restaurante</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Dona Pizza</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Bom Sabor</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Astro Burguer</span>
        <span class="ticker__dot">·</span>
        -->
        <!-- duplicado -->
         <!--
        <span class="ticker__item">Brabos Lanches</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Claude Restaurante</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">BB Lanches</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">João Restaurante</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Dona Pizza</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Bom Sabor</span>
        <span class="ticker__dot">·</span>
        <span class="ticker__item">Astro Burguer</span>
        <span class="ticker__dot">·</span>
      </div>
    </div>
-->
    <!-- Form section moved to Hero -->

    <!-- ============================================================
         DOR — IDENTIFICAÇÃO
    ============================================================ -->
    <section class="section pain-section" aria-labelledby="pain-title">
      <div class="container">

        <div class="pain__header">
          <span class="eyebrow">Sintomas comuns</span>
          <h2 id="pain-title" class="section-title">Se você toca um delivery,<br>já viveu pelo menos um disso.</h2>
        </div>

        <div class="pain__grid">
          <article class="pain-card">
            <span class="pain-card__num">01</span>
            <h3 class="pain-card__title">Instabilidade todo mês</h3>
            <p class="pain-card__text">Um mês explode de pedido, no outro despenca — e você não consegue explicar o motivo.</p>
          </article>
          <article class="pain-card">
            <span class="pain-card__num">02</span>
            <h3 class="pain-card__title">Refém do iFood</h3>
            <p class="pain-card__text">Cortou o cupom ou a entrega grátis, o pedido sumiu. Sua margem foi junto.</p>
          </article>
          <article class="pain-card">
            <span class="pain-card__num">03</span>
            <h3 class="pain-card__title">Verba sem retorno</h3>
            <p class="pain-card__text">Joga dinheiro no "impulsionar" do Instagram e não sabe quanto de faturamento voltou.</p>
          </article>
          <article class="pain-card">
            <span class="pain-card__num">04</span>
            <h3 class="pain-card__title">Sem fidelidade</h3>
            <p class="pain-card__text">Cliente pede uma vez, usado o cupom, e nunca mais aparece. Você pagou pra adquirir e perdeu.</p>
          </article>
          <article class="pain-card">
            <span class="pain-card__num">05</span>
            <h3 class="pain-card__title">Rodando no lugar</h3>
            <p class="pain-card__text">Vende muito, o caixa não sobra. A operação está no mesmo patamar há meses.</p>
          </article>
          <div class="pain-card pain-card--callout">
            <p>
              Nada disso é falta de produto bom. É falta de uma
              <strong>estrutura de marketing que usa seus dados</strong> — e não o achismo.
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         DIFERENCIAL — A DIFERENÇA DA SKALE
    ============================================================ -->
    <section class="section split-section" aria-labelledby="split-title-1">
      <div class="container split__inner">

        <div class="split__copy">
          <span class="eyebrow">Venda mais. Entenda por quê.</span>
          <h2 id="split-title-1" class="section-title">Cada pedido deixa o sistema mais inteligente.</h2>
          <p class="split__text">
            O resultado vem primeiro. Os dados mostram o caminho: quem comprou, quanto gastou,
            qual campanha trouxe o pedido e quando esse cliente pode voltar.
          </p>
          <p class="split__text">
            Com isso, mídia e CRM deixam de ser ações isoladas e passam a operar como um sistema
            que aprende e melhora toda semana.
          </p>
          <div class="split__metrics">
            <div class="metric">
              <strong class="metric__num">Semanal</strong>
              <span class="metric__label">Leitura + ajuste</span>
            </div>
            <div class="metric">
              <strong class="metric__num">CRM + mídia</strong>
              <span class="metric__label">Na mesma estratégia</span>
            </div>
            <div class="metric">
              <strong class="metric__num">1 sistema</strong>
              <span class="metric__label">Do clique à recompra</span>
            </div>
          </div>
        </div>

        <div class="split__visual">
          <div class="terminal">
            <div class="terminal__bar">
              <span class="terminal__dot"></span>
              <span class="terminal__dot"></span>
              <span class="terminal__dot"></span>
              <span class="terminal__name">dashboard_live.json</span>
            </div>
            <ul class="terminal__rows">
              <li class="terminal__row">
                <span class="terminal__key">Investimento marketing</span>
                <span class="terminal__val">R$ 4.250</span>
              </li>
              <li class="terminal__row">
                <span class="terminal__key">Vendas diretas</span>
                <span class="terminal__val terminal__val--up">R$ 18.910</span>
              </li>
              <li class="terminal__row">
                <span class="terminal__key">Pedidos recorrentes</span>
                <span class="terminal__val">42%</span>
              </li>
            
              <li class="terminal__row terminal__row--last">
                <span class="terminal__key">ROAS</span>
                <span class="terminal__val terminal__val--up">4.4×</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         SKALE VS AGÊNCIA COMUM
    ============================================================ -->
    <section class="section split-section split-section--bg-skale" aria-labelledby="split-title-2">
      <div class="container split__inner split__inner--reverse">

        <div class="split__visual">
          <div class="terminal">
            <div class="terminal__bar">
              <span class="terminal__name terminal__name--red">SQUAD SKALE DEDICADO</span>
            </div>
            <ul class="terminal__rows">
              <li class="terminal__row">
                <span class="terminal__key">Análise de CRM</span>
                <span class="terminal__val terminal__val--up">Diária</span>
              </li>
              <li class="terminal__row">
                <span class="terminal__key">Relatório ROAS + Margem</span>
                <span class="terminal__val terminal__val--up">Semanal</span>
              </li>
              <li class="terminal__row">
                <span class="terminal__key">Foco exclusivo delivery</span>
                <span class="terminal__val terminal__val--up">Sim</span>
              </li>
              <li class="terminal__row terminal__row--last">
                <span class="terminal__key">Criativos por conversão</span>
                <span class="terminal__val terminal__val--up">Sim</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="split__copy">
          <span class="eyebrow">Chega de amadorismo</span>
          <h2 id="split-title-2" class="section-title">Nada de agência que some depois do contrato.</h2>
          <p class="split__text">
            A gente não é freelancer que entrega post bonito e desaparece. A Skale é especializada só em delivery — com squad dedicado e relatório de resultado toda semana.
          </p>
          <p class="split__text">
            Investimento, pedidos, ticket médio, ROAS e recorrência tudo na mesa. Você nunca fica no escuro sobre pra onde tá indo o seu dinheiro.
          </p>
        </div>

      </div>
    </section>

    <!-- ============================================================
         O QUE ENTREGAMOS
    ============================================================ -->
    <section class="section deliver-section" aria-labelledby="deliver-title">
      <div class="container">

        <div class="section-header">
          <span class="eyebrow">Entregáveis</span>
          <h2 id="deliver-title" class="section-title">O que muda no seu delivery com a Skale.</h2>
          <p class="section-desc">Foco no crescimento de receita e lucro líquido — não em curtidas.</p>
        </div>

        <div class="deliver-grid">
          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 14l4-4 3 3 5-7 4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">Vendas previsíveis</h3>
            <p class="deliver-card__text">Estratégia baseada em dados de pedidos e conversão. Sem depender do acaso ou do iFood.</p>
          </article>

          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
                <path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">Menos dependência de iFood</h3>
            <p class="deliver-card__text">Canais próprios — site, app e WhatsApp — que vendem sem taxas abusivas comendo sua margem.</p>
          </article>

          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10a6 6 0 1 1 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M10 10l-4 4M6 10l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">Mais recorrência</h3>
            <p class="deliver-card__text">Campanhas integradas ao CRM para fazer o mesmo cliente comprar novamente — em menos tempo.</p>
          </article>

          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2l2 5h5l-4 3 1.5 5L10 12l-4.5 3L7 10 3 7h5L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">Tráfego pago especializado</h3>
            <p class="deliver-card__text">Anúncios em Meta e Google focados em delivery e geolocalização — geridos por especialistas no nicho.</p>
          </article>

          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="12" width="3" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="8.5" y="8" width="3" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <rect x="15" y="4" width="3" height="14" rx="1" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">Relatório claro toda semana</h3>
            <p class="deliver-card__text">Você sabe exatamente quanto investiu e quanto voltou em faturamento real. Sem enrolação.</p>
          </article>

          <article class="deliver-card">
            <div class="deliver-card__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v16M2 10h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
            <h3 class="deliver-card__title">IA e automações</h3>
            <p class="deliver-card__text">Relatórios, campanhas e reativação rodam por trás da operação. Você recebe decisões claras, não mais uma ferramenta.</p>
          </article>
        </div>

      </div>
    </section>
    <!-- ============================================================
         CASES
    ============================================================ -->
    <section id="cases" class="section cases-section" aria-labelledby="cases-title">
      <div class="container">

        <div class="section-header">
          <span class="eyebrow">Cases de resultado</span>
          <h2 id="cases-title" class="section-title">Quem já escalou com a gente<br>fala melhor que qualquer promessa.</h2>
        </div>

        <div class="cases-grid">
          <article class="case-card">
            <div class="case-card__content">
              <div class="case-card__top">
                <h3 class="case-card__name">Brabos Lanches</h3>
                <p class="case-card__desc">Depois de estruturar o CRM e campanhas geolocalizadas, atingiram vendas mensais estáveis acima de seis dígitos.</p>
              </div>
              <div class="case-card__bottom">
                <strong class="case-card__num">R$ 200k+</strong>
                <span class="case-card__period">faturamento mensal</span>
              </div>
            </div>
            <div class="case-card__image" style="background-image: url('/images/case-brabos.png')" role="img" aria-label="Brabos Lanches"></div>
          </article>

          <article class="case-card">
            <div class="case-card__content">
              <div class="case-card__top">
                <h3 class="case-card__name">Claude Restaurante</h3>
                <p class="case-card__desc">Margem otimizada, canal próprio de WhatsApp escalado com CRM e ROAS acima de 4x.</p>
              </div>
              <div class="case-card__bottom">
                <strong class="case-card__num">R$ 250k+</strong>
                <span class="case-card__period">faturamento mensal</span>
              </div>
            </div>
            <div class="case-card__image" style="background-image: url('/images/case-claude.png')" role="img" aria-label="Claude Restaurante"></div>
          </article>

          <article class="case-card">
            <div class="case-card__content">
              <div class="case-card__top">
                <h3 class="case-card__name">João Restaurante</h3>
                <p class="case-card__desc">Campanha de geolocalização e ativação de base inativa gerou crescimento recorde no ticket médio.</p>
              </div>
              <div class="case-card__bottom">
                <strong class="case-card__num">R$ 310k+</strong>
                <span class="case-card__period">faturamento mensal</span>
              </div>
            </div>
            <div class="case-card__image" style="background-image: url('/images/case-joao.png')" role="img" aria-label="João Restaurante"></div>
          </article>

          <article class="case-card">
            <div class="case-card__content">
              <div class="case-card__top">
                <h3 class="case-card__name">BB Lanches</h3>
                <p class="case-card__desc">Redução de 30% na dependência do iFood e escala de pedidos via canais próprios em 4 meses.</p>
              </div>
              <div class="case-card__bottom">
                <strong class="case-card__num">R$ 220k+</strong>
                <span class="case-card__period">faturamento mensal</span>
              </div>
            </div>
            <div class="case-card__image" style="background-image: url('/images/case-bb.png')" role="img" aria-label="BB Lanches"></div>
          </article>
        </div>

        <div class="cases__cta">
          <a href="#form-section" class="btn btn--primary" @click.prevent="scrollToForm">
            Quero ser o próximo resultado
          </a>
        </div>

      </div>
    </section>

    <!-- ============================================================
         COMO FUNCIONA
    ============================================================ -->
    <section class="section steps-section" aria-labelledby="steps-title">
      <div class="container">

        <div class="section-header">
          <span class="eyebrow">Processo</span>
          <h2 id="steps-title" class="section-title">Simples de começar.</h2>
          <p class="section-desc">Três etapas para colocar marketing, CRM e automação para trabalhar juntos.</p>
        </div>

        <div class="steps">
          <div class="step">
            <span class="step__num">01</span>
            <div class="step__line" aria-hidden="true"></div>
            <h3 class="step__title">Preencha o formulário</h3>
            <p class="step__text">Conte sobre o seu delivery. Leva menos de 1 minuto.</p>
          </div>
          <div class="step">
            <span class="step__num">02</span>
            <div class="step__line" aria-hidden="true"></div>
            <h3 class="step__title">Fale com especialista</h3>
            <p class="step__text">Em até 24h um especialista em delivery te chama para diagnóstico.</p>
          </div>
          <div class="step">
            <span class="step__num">03</span>
            <h3 class="step__title">Venda com previsibilidade</h3>
            <p class="step__text">Estruturamos campanhas, CRM e automações. Você cuida da operação.</p>
          </div>
        </div>

      </div>
    </section>

    <!-- ============================================================
         BLOG — CONTEÚDO DESACOPLADO DO LAYOUT
    ============================================================ -->
    <section class="section home-blog" aria-labelledby="home-blog-title">
      <div class="container">
        <div class="home-blog__header">
          <div>
            <span class="eyebrow">Conteúdo Skale</span>
            <h2 id="home-blog-title" class="section-title">Estratégia pra usar na operação.</h2>
          </div>
          <NuxtLink to="/blog" class="home-blog__all">Ver todos os artigos ↗</NuxtLink>
        </div>

        <div class="home-blog__grid">
          <BlogCard v-for="post in latestPosts" :key="post.slug" :post="post" />
        </div>
      </div>
    </section>

    <!-- ============================================================
         PARCEIROS — CREDENCIAL NO LUGAR DA ESCASSEZ
    ============================================================ -->
    <section class="section partners-section" aria-labelledby="partners-title">
      <div class="container partners-section__inner">
        <div class="partners-section__copy">
          <span class="eyebrow eyebrow--light">Ecossistema</span>
          <h2 id="partners-title" class="section-title">Parceiros de quem move o delivery no Brasil.</h2>
          <p>Integrações e relações que aproximam estratégia, dados e operação.</p>
        </div>

        <ul class="partner-list" aria-label="Parceiros Skale">
          <li v-for="partner in partnerLogos" :key="partner.name" class="partner-card">
            <img :src="partner.src" :alt="partner.name" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <SiteFooter />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { posts } = useBlog()
const latestPosts = computed(() => posts.value.slice(0, 3))

const clientLogos = [
  { name: 'Ponto Zero Sete', src: '/images/clients/ponto-zero-sete.jpg' },
  { name: 'Dogão Hot Dog', src: '/images/clients/docao.jpg' },
  { name: 'Poki', src: '/images/clients/poki-horizontal-preto.svg' },
  { name: 'Alpha Burgers', src: '/images/clients/alpha-burgers.png' },
  { name: 'Thay Poke', src: '/images/clients/thay-poke.jpg' },
  { name: 'Yashi', src: '/images/clients/yashi-4k.jpg' },
  { name: 'Território Neutro', src: '/images/clients/territorio-neutro.jpg' },
  { name: 'Poke House', src: '/images/clients/poke-house.jpg' },
  { name: 'Primos Xis', src: '/images/clients/primos-xis.jpg' },
  { name: 'Jaspion Sushi', src: '/images/clients/jaspion-sushi.jpg' },
]

const partnerLogos = [
  { name: 'iFood', src: '/images/partners/ifood.svg' },
  { name: '99Food', src: '/images/partners/99food.svg' },
  { name: 'Takeat', src: '/images/partners/takeat.svg' },
  { name: 'Cardápio Web', src: '/images/partners/cardapio-web.png' },
]

const isRevenueDropdownOpen = ref(false)

const toggleRevenueDropdown = () => {
  isRevenueDropdownOpen.value = !isRevenueDropdownOpen.value
}

const selectRevenue = (value) => {
  form.value.revenue = value
  isRevenueDropdownOpen.value = false
}

const closeDropdownOutside = (e) => {
  const dropdown = document.querySelector('.custom-dropdown')
  if (dropdown && !dropdown.contains(e.target)) {
    isRevenueDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdownOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOutside)
})

const revenueOptions = [
  { value: 'Abaixo de 50k', label: 'Abaixo de R$ 50k' },
  { value: '50k a 100k',   label: 'R$ 50k – 100k' },
  { value: '100k a 200k',  label: 'R$ 100k – 200k' },
  { value: 'Acima de 200k', label: 'Acima de R$ 200k' },
]

const form = ref({
  name:         '',
  email:        '',
  revenue:      '50k a 100k',
  whatsapp:     '',
  willInvest:   true,
  deliveryName: '',
})

const submitted = ref(false)

const submitForm = () => {
  console.log('Lead enviado:', form.value)
  submitted.value = true
}

const resetForm = () => {
  form.value = { name: '', email: '', revenue: '50k a 100k', whatsapp: '', willInvest: true, deliveryName: '' }
  submitted.value = false
}

const scrollToForm = () => {
  const el = document.getElementById('form-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style>
/* =================================================================
   RESET & BASE
================================================================= */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  background: var(--bg);
  color: var(--white);
  font-family: var(--font-body);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  background: var(--bg);
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
button { font-family: inherit; cursor: pointer; border: none; background: none; }

/* =================================================================
   TIPOGRAFIA
================================================================= */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--white);
}
</style>

<style scoped>

/* =================================================================
   LAYOUT UTILITÁRIOS
================================================================= */
.container {
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: var(--section-gap) 0;
}

.section-header {
  max-width: 640px;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-top: 0.75rem;
  margin-bottom: 1rem;
}

.section-desc {
  font-size: 1.0625rem;
  color: var(--grey);
  line-height: 1.65;
}

.eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--red);
}

/* =================================================================
   BOTÕES
================================================================= */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: all var(--ease-fast);
  white-space: nowrap;
  text-decoration: none;
}

.btn--primary {
  background: var(--red);
  color: var(--white);
  border-color: var(--red);
}
.btn-icon{
  border-color: var(--red);
}

.btn-icon:hover{
  background-color: var(--grey);
  transition: ease-out;
}

.btn--primary:hover {
  background: transparent;
  color: var(--red);
}

.btn--ghost {
  background: transparent;
  color: var(--grey);
  border-color: var(--border);
}

.btn--ghost:hover {
  border-color: var(--white);
  color: var(--white);
}

.btn--lg {
  font-size: 1rem;
  padding: 1rem 2.25rem;
}

.btn--sm {
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
}

.btn__arrow {
  transition: transform var(--ease-fast);
  flex-shrink: 0;
}

.btn:hover .btn__arrow {
  transform: translateX(4px);
}

/* =================================================================
   HEADER
================================================================= */
.header {
  position: fixed;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2.5rem);
  max-width: var(--container);
  z-index: 100;
  background: rgba(37, 37, 37, 0.45);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 100px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5), 
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all var(--ease-smooth);
}

.header--hidden {
  transform: translate(-50%, calc(-100% - 2.5rem));
  opacity: 0;
  pointer-events: none;
}

.header__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.header__logo img {
  height: 48px;
  width: auto;
}

.header__cta {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--white);
  padding: 0.5rem 1.25rem;
  border: 1.5px solid var(--border);
  border-radius: 6px;
  transition: all var(--ease-fast);
}

.header__cta:hover {
  border-color: var(--red);
  color: var(--red);
}

/* =================================================================
   HERO
================================================================= */
.hero {
  padding-top: 8rem;
  padding-bottom: 2.75rem;
  position: relative;
  overflow: hidden;
}

.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.video-bg video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  opacity: 0.90; /* Subdued background video */
}

/* Elegant dark gradient overlay to ensure text legibility and smooth blending */
.video-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(11, 11, 11, 0.3) 0%,
    rgba(11, 11, 11, 0.7) 60%,
    var(--bg) 100%
  );
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.hero__eyebrow {
  margin-bottom: 0.4rem;
}
.badge{
  text-transform: uppercase;
}

.hero__title {
  max-width: 720px;
  font-size: clamp(3rem, 4.5vw, 4.5rem);
  line-height: 0.97;
  letter-spacing: -0.04em;
  font-weight: 700;
  margin-bottom: 1.75rem;
  background: linear-gradient(145deg, var(--white) 10%, var(--grey-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__sub {
  font-size: clamp(1rem, 1.5vw, 1.1875rem);
  color: var(--grey);
  max-width: 560px;
  line-height: 1.65;
  margin-bottom: 2.5rem;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 5rem;
}

.hero__hint {
  font-size: 0.8125rem;
  color: var(--grey-dark);
  letter-spacing: 0.02em;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hero__stat-num {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.04em;
  line-height: 1;
}

.hero__stat-label {
  font-size: 0.8125rem;
  color: var(--grey-dark);
  letter-spacing: 0.02em;
}

.hero__stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

.hero__rule {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
}

/* =================================================================
   CLIENTES — PROVA SOCIAL COMPACTA
================================================================= */
.client-wall {
  position: relative;
  padding: 3.25rem 0;
  overflow: hidden;
  background: var(--red-mist);
  color: var(--bg);
}

.client-wall::before {
  position: absolute;
  top: -160px;
  right: -120px;
  width: 420px;
  height: 420px;
  border: 48px solid rgba(225, 22, 56, 0.08);
  border-radius: 50%;
  content: '';
}

.client-wall__inner {
  position: relative;
  z-index: 1;
}

.client-wall__heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.client-wall__heading h2 {
  max-width: 720px;
  margin: 0.7rem 0 0;
  color: var(--bg);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.65rem);
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.client-wall__count {
  flex: 0 0 auto;
  color: var(--red-dim);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.client-wall__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid rgba(11, 11, 11, 0.13);
  border-radius: 24px;
  background: rgba(11, 11, 11, 0.13);
  gap: 1px;
  list-style: none;
}

.client-logo {
  display: flex;
  min-width: 0;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--white);
}

.client-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform var(--ease-smooth), filter var(--ease-smooth);
}

.client-logo:hover img {
  transform: scale(1.035);
}

/* =================================================================
   SISTEMA SKALE
================================================================= */
.system-section {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 78% 22%, rgba(255, 49, 84, 0.45), transparent 23%),
    linear-gradient(145deg, var(--red-deep), #17070b 64%, #0c0c0c);
}

.system-section::after {
  position: absolute;
  right: -18rem;
  bottom: -30rem;
  width: 58rem;
  height: 58rem;
  border: 68px solid rgba(255, 241, 243, 0.06);
  border-radius: 50%;
  content: '';
}

.system-section .container {
  position: relative;
  z-index: 1;
}

.system-section__header {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem;
  align-items: end;
  margin-bottom: 3rem;
}

.system-section__header .section-title {
  max-width: 760px;
  margin-bottom: 0;
}

.system-section__header > p {
  margin: 0;
  color: rgba(255, 241, 243, 0.7);
  font-size: 1rem;
  line-height: 1.7;
}

.eyebrow--light {
  color: var(--red-soft);
}

.system-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
}

.system-card {
  min-height: 280px;
  padding: 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 11, 11, 0.28);
  backdrop-filter: blur(12px);
}

.system-card:last-child {
  border-right: 0;
}

.system-card--bright {
  background: rgba(225, 22, 56, 0.28);
}

.system-card__num {
  display: block;
  margin-bottom: 4rem;
  color: var(--red-soft);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.system-card h3 {
  margin-bottom: 0.7rem;
  font-size: 1.35rem;
}

.system-card p {
  margin: 0;
  color: rgba(255, 241, 243, 0.7);
  font-size: 0.9rem;
  line-height: 1.65;
}

.system-method {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 1.15rem 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.system-method i {
  color: var(--red-bright);
  font-style: normal;
}

/* =================================================================
   PILARES DE ATUAÇÃO (FLOW)
================================================================= */
.flow-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
}

.flow-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1100px;
}

.flow-item {
  padding: 1rem 2rem;
  border-radius: 100px;
  background: rgba(22, 22, 22, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all var(--ease-smooth);
  cursor: default;
}

.flow-item:hover {
  border-color: var(--red);
  background: rgba(225, 22, 56, 0.06);
  box-shadow: 0 8px 30px rgba(225, 22, 56, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.flow-line {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 1px;
  border-top: 1px dashed rgba(255, 255, 255, 0.25);
  min-width: 30px;
  margin: 0 10px;
}

.flow-logo {
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px) saturate(120%);
  -webkit-backdrop-filter: blur(24px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.35),
    inset 0 4px 12px rgba(255, 255, 255, 0.15),
    inset 0 -4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform var(--ease-bounce), border-color var(--ease-smooth), box-shadow var(--ease-smooth);
  cursor: pointer;
}

.flow-logo::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  z-index: 2;
}



.flow-logo:hover {
  transform: scale(1.06) translateY(-2px);
  box-shadow: 
    0 12px 40px 0 rgba(225, 22, 56, 0.25),
    inset 0 4px 12px rgba(255, 255, 255, 0.25),
    inset 0 -4px 12px rgba(0, 0, 0, 0.4);
  border-color: rgba(225, 22, 56, 0.4);
}

.flow-logo svg {
  width: 44px;
  height: auto;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: transform var(--ease-smooth);
}

.flow-logo:hover svg {
  transform: scale(1.05);
}

/* Responsive styles */
@media (max-width: 1024px) {
  .flow-wrapper {
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .flow-line {
    width: 0;
    min-width: 0;
    height: 25px;
    border-top: none;
    border-left: 1px dashed rgba(255, 255, 255, 0.25);
    flex-grow: 0;
    margin: 0 auto;
    align-self: center;
  }
  
  .flow-logo {
    padding: 0.75rem 0;
  }
}

/* =================================================================
   TICKER
================================================================= */
.ticker {
  overflow: hidden;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  background: var(--bg-card);
}

.ticker__track {
  display: flex;
  width: max-content;
  animation: ticker-scroll 30s linear infinite;
  gap: 2rem;
  align-items: center;
}

.ticker__item {
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--grey-dark);
  white-space: nowrap;
  transition: color var(--ease-fast);
}

.ticker__item:hover {
  color: var(--white);
}

.ticker__dot {
  color: var(--red);
  font-size: 1.25rem;
  line-height: 1;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* =================================================================
   FORMULÁRIO
================================================================= */
.form-section {
  border-bottom: 1px solid var(--border);
}

.form-section__header {
  text-align: center;
  margin: 0 auto;
  max-width: 580px;
  margin-bottom: 3.5rem;
}

.form-section__header .section-title {
  margin: 0 auto;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.form-wrap {
  margin: 0 auto;
  max-width: 700px;
  background: rgba(22, 22, 22, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
}

.form__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.form__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--grey);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 1rem;
}

.form__hint {
  font-size: 0.8125rem;
  color: var(--grey-dark);
  margin-top: -0.25rem;
  margin-left: 1rem;
}

.form__input {
  width: 100%;
  background: rgba(11, 11, 11, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding: 0.8rem 1.25rem;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 0.9375rem;
  transition: all var(--ease-smooth);
  outline: none;
}

.form__input:focus {
  border-color: var(--red);
  box-shadow: 0 0 15px rgba(225, 22, 56, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
  background: rgba(11, 11, 11, 0.8);
}

.form__input::placeholder {
  color: var(--grey-dark);
}

/* Pills */
.pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-left: 0.5rem;
}

.pill {
  cursor: pointer;
}

.pill input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pill__label {
  display: block;
  padding: 0.75rem 1.5rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--grey);
  background: rgba(11, 11, 11, 0.4);
  transition: all var(--ease-smooth);
  user-select: none;
}

.pill input:checked + .pill__label {
  background: var(--red);
  border-color: var(--red);
  color: var(--white);
  font-weight: 600;
  box-shadow: 0 0 15px rgba(225, 22, 56, 0.25);
}

.pill:hover .pill__label {
  border-color: var(--red);
  color: var(--white);
}

/* Toggle Sim/Não */
.toggle-group {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
  padding-left: 0.5rem;
}

.toggle-btn {
  flex: 1;
  max-width: 180px;
  padding: 0.72rem 1.2rem;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--grey);
  background: rgba(11, 11, 11, 0.4);
  cursor: pointer;
  transition: all var(--ease-smooth);
}

.toggle-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.toggle-btn--active {
  background: var(--red);
  border-color: var(--red);
  color: var(--white);
  box-shadow: 0 0 15px rgba(225, 22, 56, 0.25);
}

.toggle-btn--no {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

/* Footer do form */
.form__footer {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}

.form__trust {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--grey-dark);
}

.form__trust-dot {
  color: var(--border);
}

/* Sucesso */
.form-success {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 3rem 0;
}

.form-success__icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1.5px solid var(--red);
  color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-success__title {
  font-size: 2rem;
  font-weight: 700;
}

.form-success__text {
  font-size: 1rem;
  color: var(--grey);
  line-height: 1.65;
  max-width: 480px;
}

.form-success__text strong {
  color: var(--white);
}

/* =================================================================
   SEÇÃO DOR
================================================================= */
.pain__header {
  max-width: 640px;
  margin-bottom: 4rem;
}

.pain__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.pain-card {
  background: var(--bg);
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background var(--ease-fast);
}

.pain-card:hover {
  background: var(--bg-card);
}

.pain-card--callout {
  background: var(--red);
  grid-column: span 3;
  padding: 1.75rem 2rem;
}

.pain-card--callout p {
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--off-white);
  max-width: 700px;
}

.pain-card--callout strong {
  color: var(--white);
}

.pain-card__num {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.1em;
}

.pain-card--callout .pain-card__num {
  color: rgba(255,255,255,0.6);
}

.pain-card__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--white);
}

.pain-card__text {
  font-size: 0.9375rem;
  color: var(--grey);
  line-height: 1.6;
}

/* =================================================================
   SPLIT SECTIONS
================================================================= */
.split-section {
  border-top: 1px solid var(--border);
}

.split__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.split__inner--reverse {
  direction: rtl;
}

.split__inner--reverse > * {
  direction: ltr;
}

.split__copy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.split-section--bg-skale {
  background-image: url('/images/bg_skale.png');
  background-size: cover; 
  background-position: center 10%;  
  position: relative;
}

.split-section--bg-skale::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 11, 11, 0.45);
  pointer-events: none;
}

.split-section--bg-skale .container {
  position: relative;
  z-index: 1;
}

.split__copy .eyebrow {
  margin-bottom: 0.25rem;
}

.split__copy .section-title {
  margin: 0;
}

.clients-section{
  width: 100%;
  margin: 0 auto;
  background-color: #FFF1F3;
}
.clients-section img{
  margin: 0 auto;
  padding: 1rem;
} 

.clients-section .section-title {
  color: #0B0B0B;
}


.split__text {
  font-size: 1rem;
  color: var(--grey);
  line-height: 1.7;
}

.split__metrics {
  display: flex;
  gap: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  margin-top: 0.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.metric__num {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--red);
  letter-spacing: -0.04em;
  line-height: 1;
}

.metric:nth-child(n + 2) .metric__num {
  font-size: 1.35rem;
}

.metric__label {
  font-size: 0.8125rem;
  color: var(--grey-dark);
}

/* Terminal / Mockup card */
.terminal {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  font-family: 'SFMono-Regular', 'Consolas', 'Menlo', monospace;
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-surface);
}

.terminal__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}

.terminal__dot:nth-child(1) { background: #ff5f57; }
.terminal__dot:nth-child(2) { background: #febc2e; }
.terminal__dot:nth-child(3) { background: #28c840; }

.terminal__name {
  font-size: 0.75rem;
  color: var(--grey-dark);
  margin-left: 0.25rem;
  font-family: var(--font-body);
}

.terminal__name--red {
  color: var(--red);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.terminal__rows {
  list-style: none;
  padding: 0.5rem 0;
}

.terminal__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.875rem;
  font-family: var(--font-body);
  transition: background var(--ease-fast);
}

.terminal__row:hover {
  background: var(--bg-surface);
}

.terminal__row--last {
  border-bottom: none;
}

.terminal__key {
  color: var(--grey);
}

.terminal__val {
  font-weight: 600;
  color: var(--white);
  font-family: 'SFMono-Regular', 'Consolas', monospace;
}

.terminal__val--up  { color: #22c55e; }
.terminal__val--red { color: var(--red); }

/* =================================================================
   ENTREGÁVEIS
================================================================= */
.deliver-section {
  border-top: 1px solid var(--border);
}

.deliver-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}

.deliver-card {
  background: var(--bg);
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: background var(--ease-fast);
}

.deliver-card:hover {
  background: var(--bg-card);
}

.deliver-card__icon {
  width: 40px;
  height: 40px;
  color: var(--red);
  display: flex;
  align-items: center;
  justify-content: center;
}

.deliver-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
}

.deliver-card__text {
  font-size: 0.9375rem;
  color: var(--grey);
  line-height: 1.65;
}
/* =================================================================
   ICONES
================================================================= */
.rivet-icons_arrow-up{
  width: 12px;
  height: auto;
}

/* =================================================================
   CASES
================================================================= */
.cases-section {
  border-top: 1px solid var(--border);
}

.cases-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
}

.case-card {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-card);
  transition: border-color var(--ease-fast), transform var(--ease-smooth);
}

.case-card:hover {
  border-color: var(--border-red);
  transform: translateY(-3px);
}

.case-card__content {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
}

.case-card__top {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.case-card__name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--white);
}

.case-card__desc {
  font-size: 0.875rem;
  color: var(--grey);
  line-height: 1.6;
}

.case-card__bottom {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.case-card__num {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.04em;
}

.case-card__period {
  font-size: 0.75rem;
  color: var(--red);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.case-card__image {
  width: 180px;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--bg-surface);
}

.cases__cta {
  text-align: center;
}

/* =================================================================
   COMO FUNCIONA
================================================================= */
.steps-section {
  border-top: 1px solid var(--border);
  background:
    radial-gradient(circle at 88% 18%, rgba(225, 22, 56, 0.16), transparent 23%),
    var(--red-mist);
  color: var(--bg);
}

.steps-section .section-title,
.steps-section .step__title {
  color: var(--bg);
}

.steps-section .section-desc,
.steps-section .step__text {
  color: #6a555a;
}

.steps-section .steps::before {
  background: rgba(81, 9, 23, 0.18);
}

.steps-section .step__num {
  border-color: rgba(81, 9, 23, 0.18);
  background: var(--off-white);
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  position: relative;
}

.steps::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 5%;
  right: 5%;
  height: 1px;
  background: var(--border);
}

.step {
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.step__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg);
  font-family: var(--font-display);
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--red);
  letter-spacing: 0.05em;
  margin-bottom: 1.75rem;
}

.step__line {
  display: none;
}

.step__title {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 0.625rem;
  color: var(--white);
}

.step__text {
  font-size: 0.9375rem;
  color: var(--grey);
  line-height: 1.6;
}

/* =================================================================
   CTA FINAL
================================================================= */
.cta-section {
  border-top: 1px solid var(--border);
}

.cta-block {
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cta-block__title {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}

.cta-block__text {
  font-size: 1.0625rem;
  color: var(--grey);
  line-height: 1.65;
  max-width: 560px;
}

/* =================================================================
   BLOG NA HOME
================================================================= */
.home-blog {
  border-top: 1px solid var(--border);
  background: #0e0e0e;
}

.home-blog__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
}

.home-blog__header .section-title {
  margin-bottom: 0;
}

.home-blog__all {
  color: var(--red-bright);
  font-size: 0.82rem;
  font-weight: 700;
}

.home-blog__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

/* =================================================================
   PARCEIROS
================================================================= */
.partners-section {
  position: relative;
  overflow: hidden;
  background: var(--red);
}

.partners-section::after {
  position: absolute;
  right: -12rem;
  bottom: -19rem;
  width: 38rem;
  height: 38rem;
  border: 54px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  content: '';
}

.partners-section__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  gap: 5rem;
  align-items: center;
}

.partners-section__copy .section-title {
  margin-bottom: 1rem;
  color: var(--white);
}

.partners-section__copy > p {
  max-width: 520px;
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.65;
}

.partner-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  border-left: 1px solid rgba(255, 255, 255, 0.18);
  list-style: none;
}

.partner-card {
  display: flex;
  min-height: 148px;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  background: var(--red-mist);
}

.partner-card img {
  width: 100%;
  max-width: 190px;
  height: 64px;
  object-fit: contain;
}

/* =================================================================
   FOOTER
================================================================= */
.footer {
  border-top: 1px solid var(--border);
  padding: 2.5rem 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__logo img {
  height: 22px;
  width: auto;
  opacity: 0.7;
  transition: opacity var(--ease-fast);
}

.footer__logo:hover img {
  opacity: 1;
}

.footer__copy {
  font-size: 0.8125rem;
  color: var(--grey-dark);
}

/* =================================================================
   CUSTOM DROPDOWN
================================================================= */
.custom-dropdown {
  position: relative;
  width: 100%;
}

.custom-dropdown__trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-dropdown__icon {
  transition: transform var(--ease-fast);
  color: var(--grey);
}

.custom-dropdown--open .custom-dropdown__icon {
  transform: rotate(180deg);
}

.custom-dropdown__menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 0.5rem;
  list-style: none;
  z-index: 10;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: fadeUp 0.2s var(--ease-fast) both;
}

.custom-dropdown__item {
  padding: 0.875rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--grey);
  cursor: pointer;
  transition: all var(--ease-fast);
}

.custom-dropdown__item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--white);
}

.custom-dropdown__item--selected {
  background: rgba(225, 22, 56, 0.1);
  color: var(--red);
  font-weight: 600;
}

/* =================================================================
   ANIMAÇÕES
================================================================= */
.fade-in {
  animation: fadeUp 0.45s var(--ease-smooth) both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* =================================================================
   RESPONSIVO
================================================================= */
@media (max-width: 1024px) {
  .system-section__header,
  .partners-section__inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .client-wall__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .system-grid {
    grid-template-columns: 1fr;
  }

  .system-card {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .system-card:last-child {
    border-bottom: 0;
  }

  .system-card__num {
    margin-bottom: 2rem;
  }

  .home-blog__grid {
    grid-template-columns: 1fr 1fr;
  }

  .split__inner {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .split__inner--reverse {
    direction: ltr;
  }

  .pain__grid {
    grid-template-columns: 1fr 1fr;
  }

  .pain-card--callout {
    grid-column: span 2;
  }

  .deliver-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  :root {
    --section-gap: 4.5rem;
  }

  .client-wall__inner {
    gap: 1.5rem;
  }

  .client-wall__heading {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 1.75rem;
  }

  .client-wall__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .system-method {
    align-items: stretch;
    flex-direction: column;
    border-radius: 18px;
    text-align: center;
  }

  .system-method i {
    transform: rotate(90deg);
  }

  .home-blog__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .home-blog__grid {
    grid-template-columns: 1fr;
  }

  .partner-list {
    grid-template-columns: 1fr;
  }

  .partner-card {
    min-height: 124px;
  }

  .hero__stats {
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .hero__stat-divider {
    display: none;
  }

  .form__row {
    grid-template-columns: 1fr;
  }

  .form-wrap {
    padding: 2.25rem 1.5rem;
    border-radius: 24px;
  }

  .pain__grid {
    grid-template-columns: 1fr;
  }

  .pain-card--callout {
    grid-column: span 1;
  }

  .deliver-grid {
    grid-template-columns: 1fr;
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }

  .case-card__image {
    display: none;
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .steps::before {
    display: none;
  }

  .step {
    padding: 0;
  }

  .form__footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
