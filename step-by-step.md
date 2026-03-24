https://www.typescriptlang.org/pt/docs/handbook/typescript-in-5-minutes.html

1 - Instalar libs necessárias no projeto-alvo (API NodeJS + Express):
```bash
npm install -D typescript @types/node @types/express @types/cors ts-node-dev
```

2 - Criar arquivo `tsconfig.json`
```bash
    npx tsc --init
```

3 - Configurações do `tsconfig.json`
```json
    {
        // Visit https://aka.ms/tsconfig to read more about this file
        "compilerOptions": {
            // File Layout
            "rootDir": "./src",
            "outDir": "./dist",

            // Environment Settings
            // See also https://aka.ms/tsconfig/module
            "module": "commonjs",
            "target": "es2022",
            "types": [],
            // For nodejs:
            // "lib": ["esnext"],
            // "types": ["node"],
            // and npm install -D @types/node

            // Other Outputs
            "sourceMap": true,
            "declaration": true,
            "declarationMap": true,

            // Stricter Typechecking Options
            "noUncheckedIndexedAccess": true,
            "exactOptionalPropertyTypes": true,

            // Style Options
            // "noImplicitReturns": true,
            // "noImplicitOverride": true,
            // "noUnusedLocals": true,
            // "noUnusedParameters": true,
            // "noFallthroughCasesInSwitch": true,
            // "noPropertyAccessFromIndexSignature": true,

            // Recommended Options
            "strict": true,
            "jsx": "react-jsx",
            "isolatedModules": true,
            "noUncheckedSideEffectImports": true,
            "moduleDetection": "force",
            "skipLibCheck": true,
            "verbatimModuleSyntax": false,
            "esModuleInterop": true,
        }
    }

```


4 - Garantir que o `package.json` esteja sem pré-definição de módulo e configurar o script para rodar código localmente (dev) no `package.json`
OBS: garanta que o ts-node-dev esteja instalado no projeto

```json
{
  // ...
  "scripts": {
    // ... 
    "dev": "ts-node-dev --respawn --transpile-only  ./src/server.ts"
  },
 //...
}
```

