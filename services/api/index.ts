Bun.serve({
  port: 8080,
  fetch(req: Request) {
    return new Response(`Hello, World!: ${process.env.DB_HOST ?? "No"}`);
  },
});