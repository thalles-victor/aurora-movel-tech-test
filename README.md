## Aurora Móvel

A Aurora Móvel é mais do que uma plataforma de carros — é uma solução completa para quem busca mobilidade com praticidade e inovação. Desenvolvida para atender às necessidades de motoristas modernos, ela oferece ferramentas intuitivas que conectam você ao seu veículo de maneira simples e eficiente, desde o gerenciamento de rotas até o acompanhamento em tempo real. Com tecnologia de ponta e um design pensado para o usuário, a Aurora Móvel transforma cada viagem em uma experiência única, garantindo que você tenha o controle total da sua jornada enquanto nós cuidamos dos detalhes técnicos. Seja para o dia a dia ou para aventuras maiores, a Aurora Móvel está pronta para ser sua parceira na estrada, iluminando o caminho com confiança e segurança.

### 🛠 Pendendências nescessárias.

Este projeto precisa do node com o docker instalados, se caso não tenha, consulte as respectivas documentações para instalar.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/pt) é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/) é uma plataforma de software de código aberto que permite criar, gerenciar e executar aplicações em contêineres virtuais. É uma ferramenta útil para quem trabalha com desenvolvimento de software e administração de sistemas

#### instalando as dependências

para o frontend

```bash
cd aurora-frontend && npm install
```

para o backend

```bash
cd aurora-backend && npm install
```

### Configurando as variáveis de ambiente

#### Frontend

Para criar as variáveis de ambiente no frontend entre na pasta [environments](./aurora-frontend/src/environments) e crie um arquivo chamado de _environment.ts_ dentro dele preenha com as seguintes informações:

```ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000", // url do backend
};
```

#### Backend

O schema das variáveis de ambiente está descrito abaixo. As que já estão declaradas não são sensíveis e pode ser mudadas de acordo com a preferência do desenvolvedor. Já as que não estão declaradas são sensíveis e por isso não foi declaradas. Você pode consultar a equipe de desenvolvimento ou buscar nas nos provedores (sites) onde encontra-lás para preencher.

Crie na raiz do backend um arquivo chamdo _.env_ e preencha com as seguintes informações:

```env
# BACKEND
BACKEND_PROTOCOL=http
BACKEND_DOMAIN=localhost
PORT=3000

# POSTGRES
POSTGRES_HOST=aurora-movel-database
# POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=db
POSTGRES_USER=user
POSTGRES_PASSWORD=pass

# POSTGRES
ROOT_EMAIL=rootuser@gmail.com
ROOT_PASSWORD=root

# JWT
JWT_SECRET=secret
JWT_EXPIRES_IN=1y

# STORAGE
STORAGE_PROVIDER=local
PUBLIC_IMAGES_BUCKET_NAME=static-images

# AWS (Opcional se usar de forma local)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# FRONTEND
FRONT_END_URL="http://localhost:4200"
```

- 🔑 Para ter acesso ao root, as credenciais do mesmo devem ser passadas no arquivo env, passando o email e a senha, logo em seguida é nescessário criar uma conta para cadastrar o usuário root.

- 🛡️ Para gerar as secrets do JWT você pode rodar o seguinte comando:

```
node -e "console.log(require('crypto').randomBytes(200).toString('base64'))"
```

### ⚡ Rodando o projeto.

Com o docker instalado você pode entrar na pasta raiz (root) do seu projeto e executar o comando abaixo para ele rodar todos os containers descritos no [docker-compose.yml](./docker-compose.yml):

```bash
docker compose up
```

Para verificar se todos os containers estão rodando, execute o comando

```bash
docker ps
```

Se aparecer os 3 containers siguinifica que a aplicação está rodando corretamente como no exemplo abaixo.

```
3f50dc07ae7b   aurora-movel-tech-test-aurora-frontend   "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:4200->4200/tcp, [::]:4200->4200/tcp   aurora-frontend
258e79306d63   aurora-movel-tech-test-aurora-backend    "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp   aurora-backend
7662fd84ad13   postgres:15-alpine                       "docker-entrypoint.s…"   7 minutes ago   Up 7 minutes   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   aurora-movel-database
```
