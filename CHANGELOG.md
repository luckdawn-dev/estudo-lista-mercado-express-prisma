# Changelog

## [Unreleased]

### Fixed
- Corrigido erro `TS2688: Cannot find type definition file for 'jest' / 'node'` no deploy do Vercel.
- Ajustado `tsconfig.json` para não forçar `types` explicitamente e excluir `tests` do build.
- Corrigido `postinstall` no `package.json` (`prisma skills sync` → `prisma generate`).
- Creado `vercel.json` para instalar `devDependencies` (`npm ci --include=dev`) e definir `build`.
- Adicionado `api/index.ts` e configurado `vercel.json` com `rewrites`/`functions` para serverless, removendo exigência de `public`.
- Corrigido `index.ts` para não chamar `listen` quando `VERCEL` estiver definido.
