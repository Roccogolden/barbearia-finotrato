# Website da barbearia Valor do Corte

## Objetivo
Criar um site híbrido, responsivo e sofisticado para a barbearia **Valor do Corte**, com uma página inicial completa e páginas próprias para conteúdos que exigem mais detalhe. O conteúdo comercial será demonstrativo e poderá ser substituído depois pelos dados reais.

## Estrutura
- **Início (`/`)**: navegação, apresentação visual, resumo da história, serviços em destaque, seleção da galeria, equipe, avaliações, chamada para agendamento e contato resumido.
- **Serviços (`/servicos`)**: catálogo completo com descrições e preços demonstrativos.
- **Galeria (`/galeria`)**: trabalhos organizados visualmente, com fotos em destaque.
- **Equipe (`/equipe`)**: perfis dos barbeiros, especialidades e disponibilidade indicativa.
- **Agendamento (`/agendamento`)**: página dedicada com seleção de serviço, profissional, data, horário e dados do cliente; validação clara e confirmação visual da solicitação.
- **Contato (`/contato`)**: endereço, telefone, e-mail, horário demonstrativo e área reservada para mapa.
- Cabeçalho e rodapé consistentes em todas as páginas, com navegação móvel acessível.

## Direção visual
- Estética de barbearia contemporânea com referências tradicionais, usando preto/carvão, cinza, marrom quente e um acento metálico discreto.
- Tipografia editorial forte nos títulos e fonte altamente legível no conteúdo.
- Fotografias autorais geradas especificamente para o ambiente, cortes, equipe e detalhes da barbearia; sem imagens genéricas de banco.
- Composição limpa, contraste alto, bordas discretas e cartões usados apenas para itens repetidos.
- Ícones profissionais e coerentes com o universo da barbearia.
- Transições e revelações suaves, com movimento reduzido quando configurado no dispositivo.

## Experiência e responsividade
- Construção mobile-first para telefone, tablet e desktop.
- Botão de agendamento sempre fácil de encontrar, sem bloquear o conteúdo.
- Menu móvel operável por toque e teclado.
- Formulários com rótulos claros, mensagens de erro e estados de foco visíveis.
- Imagens com proporções estáveis para evitar deslocamentos durante o carregamento.
- Contraste, hierarquia de títulos e textos alternativos revisados para acessibilidade.

## Conteúdo demonstrativo
- Criar nomes, história, serviços, preços, profissionais, avaliações e horários plausíveis em português brasileiro.
- Marcar endereço, telefone, e-mail e redes sociais como dados demonstrativos, evitando apresentar informações inventadas como reais.
- O formulário de agendamento funcionará como uma experiência completa de interface, mas não enviará nem armazenará reservas sem uma integração futura.

## Implementação técnica
- Usar a estrutura atual em React com rotas próprias e metadados exclusivos por página.
- Centralizar paleta, tipografia, sombras e raios em tokens semânticos do tema.
- Criar componentes reutilizáveis para navegação, rodapé, serviços, profissionais, avaliações e campos do agendamento.
- Gerar e incorporar as imagens necessárias ao projeto, com carregamento adequado e dimensões explícitas.
- Adicionar metadados de compartilhamento e descrição específicos para cada página.

## Validação
- Conferir navegação, menu móvel, formulário e estados de interação.
- Verificar visualmente a página inicial e o agendamento em dimensões de celular e desktop.
- Confirmar ausência de sobreposição, cortes de texto, links sem destino e erros no navegador.
