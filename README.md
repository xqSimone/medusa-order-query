1. Copy the `.env.example` file to `.env`:

```shell
  cp .env.example .env
```

2. setup postgres
```bash
docker compose up --detach
```

3. install dependencies
```bash
pnpm install
```

4. execute the script
```bash
pnpm medusa exec ./src/scripts/get-order.ts
```
