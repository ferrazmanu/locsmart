# 🚗 LocSmart

O **LocSmart** é um sistema de **monitoramento de veículos** por meio de **câmeras localizadas em rodovias**, oferecendo uma interface moderna e intuitiva para visualização e gerenciamento das informações captadas.  
O projeto foi desenvolvido com foco em **desempenho**, **usabilidade** e **integração com APIs externas**, permitindo que usuários e administradores acompanhem em tempo real os dados coletados.

---

## 💻 Tecnologias Utilizadas

- **Next.js** – Framework React para renderização otimizada e rotas dinâmicas
- **TypeScript** – Tipagem estática e segurança no desenvolvimento
- **Styled Components** – Estilização com CSS-in-JS
- **Axios** – Cliente HTTP para integração com a API
- **React Hook Form** – Gerenciamento eficiente de formulários

---

## ⚙️ Como Rodar o Projeto Localmente

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/ferrazmanu/locsmart.git
   ```

2. **Entre na pasta do projeto:**

   ```bash
   cd locsmart
   ```

3. **Instale as dependências:**

   ```bash
    npm install
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo chamado .env.local na raiz do projeto e adicione as variáveis abaixo:

   ```bash
   NEXT_PUBLIC_ENV= # ambiente atual (ex: development, production)
   API_URL= # URL base da API utilizada pelo sistema
   NEXT_PUBLIC_HOME_REDIRECT= # rota ou URL para redirecionamento após login ou ação
   ```

5. **Execute o projeto em modo de desenvolvimento:**

   ```bash
    npm run dev
   ```

6. **Acesse no navegador:**

   ```bash
   http://localhost:3000
   ```

## 🌐 Integração com a API

O LocSmart se conecta a uma API REST, utilizando Axios para realizar as requisições.
As chamadas são centralizadas na pasta src/services, garantindo organização e facilidade de manutenção.

Exemplo de chamada básica:

```bash
import api from "@/services/api";

async function getVehicles() {
  const response = await api.get("/vehicles");
  return response.data;
}
```

## 🖼️ Funcionalidades Principais

- Listagem e monitoramento de veículos em tempo real
- Visualização de dados provenientes das câmeras de rodovia
- Integração com API para busca e atualização de informações
- Interface responsiva e adaptável a diferentes dispositivos
- Sistema de formulários com validação (React Hook Form)

## 🚀 Build e Deploy

**Para gerar a versão de produção:**

```bash
 npm run build
```

**Para executar o build gerado:**

```bash
npm start
```

## 👩‍💻 Créditos

Desenvolvido por Manuela Ferraz, Desenvolvedora Front-End
🔗 https://github.com/ferrazmanu

Este projeto foi desenvolvido como entrega de serviço freelance, com foco em performance, organização e escalabilidade.
