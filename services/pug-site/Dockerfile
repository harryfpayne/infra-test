FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY index.ts ./index.ts

RUN bun install
CMD ["bun", "run", "index.ts"]