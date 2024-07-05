/*
/////////// Instruçoes de uso ////////////

Terminal:
mkdir server
cd server
npm init -y
npm install express nodemailer body-parser cors dotenv

Aplicar:
EMAIL=seuemail@gmail.com
PASSWORD=suasenha

Utilizar:
CadastroEnvioEmail.js
*/
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

app.post('/send-email', (req, res) => {
  const { nome, sobrenome, email, empresa, pais, telefone1 } = req.body;

  const mailOptions = {
    from: email,
    to: 'emaildaempresa@example.com',
    subject: 'Novo cadastro recebido',
    text: `Nome: ${nome}\nSobrenome: ${sobrenome}\nEmail: ${email}\nEmpresa: ${empresa}\nPaís: ${pais}\nTelefone: ${telefone1}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email enviado: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
