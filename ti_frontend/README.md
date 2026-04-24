# 📘 Sistema Web para Gestão de Produtos, Marcas e Ordens de Serviço  

---  

## 👤 Acadêmico  

**Nome:** Matheus Aurelio de Brito  
**Curso:** Sistemas de Informação – 3º período  
**Local:** Paranavaí  
**Data:** 16 de março de 2026 (Atualizado)  

---  

# 📌 1. Introdução  

O presente projeto consiste no desenvolvimento de um sistema web full stack voltado ao gerenciamento de produtos, marcas, pessoas, usuários e ordens de serviço (OS).  

A proposta central é simular um ambiente corporativo real, no qual há a necessidade de controlar:  

* Atendimentos técnicos 
* Cadastro e relacionamento de entidades 
* Fluxo de execução de serviços 
* Rastreabilidade de ações ao longo do tempo  

Um dos diferenciais do sistema é a **separação conceitual entre identidade e acesso**, representada pelas entidades **Pessoa** e **Usuário**, permitindo maior flexibilidade e aderência a cenários reais.  

---  

# 🎯 2. Objetivo Geral  

Desenvolver uma aplicação web integrada que permita o gerenciamento centralizado de informações organizacionais, garantindo:  

* Consistência dos dados 
* Aplicação de regras de negócio no backend 
* Facilidade de uso no frontend 
* Escalabilidade para futuras funcionalidades  

---  

# 🎯 3. Objetivos Específicos  

## 📦 Cadastros  

O sistema permite a manutenção das seguintes entidades:  

* Produtos/equipamentos 
* Marcas 
* Pessoas (dados de identidade) 
* Usuários (dados de acesso vinculados à pessoa)  

Essa separação evita redundância e melhora a organização estrutural do sistema.  

---  

## 🔄 Movimentação de Informações  

O sistema implementa um fluxo de trabalho baseado em ordens de serviço:  

* Abertura de OS com geração automática de data e hora 
* Atualização de status ao longo do ciclo de vida 
* Registro de comentários operacionais 
* Associação com produto e pessoa responsável 
* Controle financeiro da OS  

---  

## 📊 Relatórios e Monitoramento  

### Relatórios Cadastrais  

* Listagem de produtos 
* Listagem de marcas 
* Listagem de pessoas 
* Listagem de ordens de serviço  

### Relatórios Gerenciais  

* Quantidade de OS por status 
* OS abertas vs finalizadas 
* Monitoramento de fluxo operacional  

---  

## 🧠 Experiência do Usuário (UX)  

* Interface baseada em componentes do PrimeNG 
* Feedback visual com Toasts 
* Validação reativa com Angular Reactive Forms 
* Comportamento dinâmico de formulário:    
    * Criação → simplificada   
    * Edição → completa  

---  

# 🧱 4. Justificativa  

A utilização de processos manuais ou planilhas para controle de dados organizacionais apresenta limitações como:  

* Alto risco de inconsistência 
* Dificuldade de rastreamento 
* Falta de padronização 
* Baixa escalabilidade  

O sistema proposto resolve esses problemas ao:  

* Centralizar os dados em um banco relacional 
* Aplicar regras de negócio no backend 
* Garantir integridade referencial 
* Permitir evolução contínua  

Além disso, a separação entre Pessoa e Usuário reflete uma prática comum em sistemas corporativos, aumentando a qualidade do modelo de dados.  

---  

# 🏗️ 5. Arquitetura do Sistema  

O sistema segue o modelo **Cliente-Servidor (Client-Server)** com separação clara de responsabilidades.  

---  

## 🖥️ Frontend (Angular)  

### Tecnologias:  

* Angular (Standalone Components) 
* TypeScript 
* PrimeNG 
* Reactive Forms 
* Signals  

### Responsabilidades:  

* Renderização da interface 
* Validação inicial dos dados 
* Controle de estado local 
* Comunicação com API REST  

### Características importantes:  

* Uso de `ngOnChanges` para sincronização de edição 
* Uso de `patchValue()` para preenchimento de formulários 
* Separação entre lógica de UI e serviços  

---  

## ⚙️ Backend (Spring Boot)  

### Tecnologias:  

* Java 
* Spring Boot 
* Spring Data JPA 
* Hibernate  

### Responsabilidades:  

* Regras de negócio 
* Controle transacional 
* Persistência de dados 
* Validação de integridade  

### Destaques:  

* Uso de eventos do JPA:    
    * `@PrePersist` (criação)   
    * `@PreUpdate` (atualização) 
* Tratamento de exceções (ex: integridade referencial)  

---  

## 🗄️ Banco de Dados  

* PostgreSQL 
* Estrutura relacional normalizada 
* Controle de integridade via chaves estrangeiras  

---  

# 🧩 6. Modelagem do Sistema  

## 🔹 Marca  

* id 
* nome  

---  

## 🔹 Produto  

* id 
* nome 
* descrição 
* valor 
* valorTotal (valor*quantidade) 
* quantidade 
* marca (ManyToOne)  

---  

## 🔹 Pessoa  

* id 
* nome 
* cpf/cnpj 
* telefone 
* endereço 
* Enum funcao (ADMIN, TECNICO, FINANCEIRO, CLIENTE_EMPRESA, CLIENTE_PF, FORNECEDOR) 
* usuario (OneToOne)  

---  

## 🔹 Usuário  

* id 
* email 
* senha 
* nomeUsuario 
* pessoa (OneToOne)  

---  

## 🔹 Ordem de Serviço (OS)  

* id 
* titulo 
* descricao 
* comentario 
* valor 
* status (NOVO, EM_ANDAMENTO, FINALIZADO, CANCELADO) 
* dataAbertura 
* horaAbertura 
* dataFechamento 
* horaFechamento 
* produto (ManyToOne) 
* pessoa (ManyToOne)  

---  

# ⚙️ 7. Regras de Negócio  

## 🔒 Integridade Referencial  

* Não é permitido excluir uma marca com produtos vinculados 
* Tratado via exceção `DataIntegrityViolationException`  

---  

## 🕒 Auditoria de Dados  

### Abertura da OS  

* Definida automaticamente via `@PrePersist` 
* Status inicial: `NOVO`  

### Ajustar ainda o Fechamento da OS  

* Definido automaticamente via `@PreUpdate` 
* Condição: status alterado para `FINALIZADO`  

---  

## 🔐 Separação Pessoa x Usuário  

* Pessoa representa identidade 
* Usuário representa acesso 
* Nem toda pessoa é um usuário  

---  

## 🎯 Comportamento Inteligente de Formulário  

* Criação: campos essenciais 
* Edição: campos completos (status, datas, etc.)  

---  

# ⚠️ 8. Problemas Enfrentados e Evolução Técnica  

## 🧨 Sincronização de Dados (Angular)  

Uso de `ngOnChanges` para atualizar formulário ao editar.  

---  

## 🧨 Conversão de Datas  

Problema clássico:  

* Angular → `Date` 
* Java → `LocalDate` / `LocalTime`  

Solução:  

* Conversão manual 
* Padronização de formato 
* Uso de `@JsonFormat`  

---  

## 🧨 Erro de Chave Estrangeira  

Exclusão de marca com produtos → erro 500  

Solução:  

* Tratamento no backend 
* Feedback amigável no frontend (Toast)  

---  

## 🧨 Controle de Auditoria  

Problema: evitar sobrescrever dados  

Solução:  

* Delegar controle ao JPA (`@PrePersist` e `@PreUpdate`) 
* Evitar manipulação indevida no frontend  

---  

# 💻 9. Tecnologias Utilizadas  

## Frontend  

* Angular 
* TypeScript 
* PrimeNG  

## Backend  

* Java 
* Spring Boot 
* Hibernate / JPA  

## Banco  

* PostgreSQL  

## Ferramentas  

* IntelliJ IDEA 
* VS Code 
* PgAdmin 
* Draw.io / Excalidraw  

---  

# 🚀 10. Considerações Finais  

O sistema evoluiu de um CRUD simples para uma aplicação com:  

* Regras de negócio reais 
* Separação de responsabilidades 
* Tratamento de erros 
* Controle de ciclo de vida dos dados  

O projeto demonstra domínio progressivo em desenvolvimento full stack e integração entre camadas.  

---  

# 🔮 11. Próximos Passos  

* Autenticação e autorização (Spring Security) 
* Controle de roles/perfis 
* Dashboard analítico 
* Interceptors globais no Angular 
* API REST mais robusta (DTOs) 
* Logs e auditoria avançada  

---
