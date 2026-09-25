const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// CONEXÃO COM O BD
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha_aqui', // SENHA DO MYSQL
  
  database: 'starbook_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL!');
});



app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)';
  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: 'Usuário cadastrado com sucesso!' });
  });
});



app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email =? AND senha =?';
  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    if (result.length > 0) {
      res.json({ mensagem: 'Login feito com sucesso!', usuario: result[0] });
    } else {
      res.status(401).json({ mensagem: 'Email ou senha incorretos' });
    }
  });
});

// CRUD DESABAFOS
app.post('/desabafos', (req, res) => {
  const { usuario_id, texto, anonimo } = req.body;
  db.query('INSERT INTO desabafos (usuario_id, texto, anonimo) VALUES (?,?,?)', [usuario_id, texto, anonimo], (err) => {
    if(err) return res.status(500).json(err);
    res.json({mensagem: 'Desabafo criado!'});
  });
});

app.get('/desabafos', (req, res) => {
  db.query('SELECT d.*, u.nome FROM desabafos d JOIN usuarios u ON d.usuario_id = u.id ORDER BY d.data_criacao DESC', (err, result) => {
    if(err) return res.status(500).json(err);
    res.json(result);
  });
});

app.put('/desabafos/:id', (req, res) => {
  const { texto } = req.body;
  db.query('UPDATE desabafos SET texto = ? WHERE id = ?', [texto, req.params.id], (err) => {
    if(err) return res.status(500).json(err);
    res.json({mensagem: 'Editado!'});
  });
});

app.delete('/desabafos/:id', (req, res) => {
  db.query('DELETE FROM desabafos WHERE id = ?', [req.params.id], (err) => {
    if(err) return res.status(500).json(err);
    res.json({mensagem: 'Apagado!'});
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

