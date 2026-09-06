export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 16px/1.7 system-ui, -apple-system, sans-serif; background: #0B1512; color: #fff; display: grid; place-items: center; min-height: 100dvh; box-sizing: border-box; margin: 0; padding: 1.5rem; }
      .card { max-width: 40rem; box-sizing: border-box; border-top: 3px solid #D9FF43; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: clamp(2.3rem, 7vw, 4rem); line-height: 1.1; letter-spacing: -.05em; color: #D9FF43; margin: 0 0 0.5rem; }
      p { color: #bdc9c2; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 999px; min-height: 48px; box-sizing: border-box; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #D9FF43; color: #0B1512; }
      .secondary { background: #12231D; color: #fff; border-color: #52635b; }
      :focus-visible { outline: 3px solid #FF795F; outline-offset: 4px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
