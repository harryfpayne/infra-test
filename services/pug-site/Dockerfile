FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY views/* ./views/*
COPY index.ts ./index.ts

RUN bun install
CMD ["bun", "run", "index.ts"]