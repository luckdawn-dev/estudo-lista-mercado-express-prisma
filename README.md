# Lista Mercado - Backend (Express + Prisma)

## Arquitetura (Senior Delivery)
- **Camadas:** Controller → Service → Repository (Prisma) → DB
- **Validação:** Zod schemas com middleware centralizado
- **Segurança:** Helmet + Rate Limit + CORS restrito por env
- **Observabilidade:** Healthcheck (`/health`) + Error Handler middleware
- **Testes:** Supertest integration tests em `tests/`
- **Infra:** Docker Compose + Dockerfile para ambiente reproduzível

## Como rodar
```bash
docker-compose up -d db
npm install
npx prisma migrate dev --name init
npm run dev
```

## Pontos de Senior
- Separação de concerns (não faz DB direto no controller)
- Tratamento de erro padronizado (não só 500)
- Documentação de decisão (ADR pode ser adicionado em `docs/`)
