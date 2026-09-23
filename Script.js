async function cadastrar() {
  const nome = document.getElementById('cadastro-nome').value;
  const email = document.getElementById('cadastro-email').value;
  const senha = document.getElementById('cadastro-senha').value;

  const res = await fetch('/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  });
  const data = await res.json();
  document.getElementById('mensagem').innerText = data.mensagem;
}

async function logar() {
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;

  const res = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  const data = await res.json();
  document.getElementById('mensagem').innerText = data.mensagem;
}
