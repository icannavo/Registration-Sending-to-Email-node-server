import React, { useState } from 'react';
import './ComponenteCSS/Cadastro.css'; // Estilos customizados
import { useForm } from 'react-hook-form';

const Cadastro = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [captchaState, setCaptchaState] = useState('initial'); // 'initial', 'verifying', 'verified'
  const [message, setMessage] = useState(null);

  const handleCaptchaChange = () => {
    if (captchaState === 'initial') {
      setCaptchaState('verifying');
      setTimeout(() => {
        setIsCaptchaChecked(true);
        setCaptchaState('verified');
      }, 2500); // 2.5 seconds delay
    }
  };

  const onSubmit = async (data) => {
    if (!isCaptchaChecked) {
      alert('Por favor, marque o reCAPTCHA antes de enviar o formulário.');
      return;
    }

    const formData = new FormData();
    formData.append('entry.1158078509', data.nome); // Nome
    formData.append('entry.1004107533', data.sobrenome); // Sobrenome
    formData.append('entry.262332836', data.email); // Email
    formData.append('entry.1808553454', data.empresa); // Empresa
    formData.append('entry.1856882942', data.pais); // País
    formData.append('entry.1620712146', data.telefone1); // Telefone

    try {
      const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfdugkOqe7veNfJSN32tB1K7ikkX8LsDpOC1E_z7yQ4VuB-_w/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });

      const emailResponse = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok || response.status === 0) {
        setMessage('Formulário enviado com sucesso! Entraremos em contato em breve.');
        reset();
        setIsCaptchaChecked(false);
        setCaptchaState('initial');
      } else {
        setMessage('Erro ao enviar formulário. O servidor não está disponível. Tente novamente mais tarde.');
      }

      if (emailResponse.ok) {
        console.log('Email enviado com sucesso');
      } else {
        console.log('Erro ao enviar email');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage('Erro ao enviar formulário. O servidor não está disponível. Tente novamente mais tarde.');
    }
  };

  const countryOptions = [
    // Lista de países
    "Afeganistão", "África do Sul", "Albânia", "Alemanha", "Andorra", "Angola", "Argentina", "Armênia", "Aruba", "Austrália", "Áustria", "Azerbaijão",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Bélgica", "Belize",
    "Benin", "Bermudas", "Bielorrússia", "Bolívia", "Bósnia e Herzegovina",
    "Botswana", "Brasil", "Brunei", "Bulgária", "Burkina Faso", "Burundi",
    "Butão", "Cabo Verde", "Camarões", "Camboja", "Canadá", "Catar",
    "Cazaquistão", "Chade", "Chile", "China", "Chipre", "Cingapura",
    "Colômbia", "Comores", "Congo", "Coréia do Sul", "Costa do Marfim",
    "Costa Rica", "Croácia", "Cuba", "Dinamarca", "Djibouti", "Dominica",
    "Egito", "El Salvador", "Emirados Árabes Unidos", "Equador", "Eritreia",
    "Escócia", "Eslováquia", "Eslovênia", "Espanha", "Estados Unidos",
    "Estônia", "Fiji", "Filipinas", "Finlândia", "França", "Gabão", "Gâmbia",
    "Gana", "Geórgia", "Gibraltar", "Granada", "Grécia", "Guadalupe",
    "Guatemala", "Guernsey", "Guiana", "Guiana Francesa", "Guiné",
    "Guiné Equatorial", "Guiné-Bissau", "Haiti", "Holanda", "Honduras",
    "Hong Kong", "Hungria", "Iemen", "Ilha de Man", "Ilhas Cayman",
    "Ilhas Maurício", "Ilhas Salomão", "Ilhas Virgens Britânicas", "Índia",
    "Indonésia", "Inglaterra", "Irã", "Iraque", "Irlanda", "Islândia",
    "Israel", "Itália", "Jamaica", "Japão", "Jersey", "Jordânia", "Kuwait",
    "Laos", "Lesoto", "Letônia", "Líbano", "Libéria", "Líbia",
    "Liechtenstein", "Lituânia", "Luxemburgo", "Macau", "Macedonia",
    "Madagascar", "Malásia", "Malawi", "Maldivas", "Mali", "Malta", "Marrocos",
    "Martinica", "Mauritânia", "México", "Mianmar", "Micronésia",
    "Moçambique", "Moldávia", "Mônaco", "Mongólia", "Montenegro",
    "Montserrat", "Namíbia", "Nepal", "Nicarágua", "Níger", "Nigéria",
    "Noruega", "Nova Caledônia", "Nova Zelândia", "Omã", "Outros", "Panamá",
    "Papua Nova Guiné", "Paquistão", "Paraguai", "Peru", "Polinésia Francesa",
    "Polônia", "Porto Rico", "Portugal", "Quênia", "Quirguistão",
    "República Checa", "República da África Central", "República Dominicana",
    "Romênia", "Ruanda", "Rússia", "Samoa", "San Marino", "Santa Lúcia",
    "São Cristóvão e Nevis", "São Tomé e Príncipe", "São Vicente e Granadinas",
    "Senegal", "Serra Leoa", "Sérvia", "Seychelles", "Síria", "Somália",
    "Sri Lanka", "Suazilândia", "Sudão", "Suécia", "Suíça", "Suriname",
    "Tailândia", "Taiwan", "Tajiquistão", "Tanzânia", "Timor-Leste", "Togo",
    "Tonga", "Trinidad e Tobago", "Tunísia", "Turcomenistão", "Turquia",
    "Ucrânia", "Uganda", "Uruguai", "Uzbequistão", "Vaticano", "Venezuela",
    "Vietnã", "Zâmbia", "Zimbábue"
  ];

  return (
    <section id="subscribe">
      <div>
        <div className="row">
          <div className="col-lg-4 text">
            <h4>
              Cadastre-se
              <img src="/assets/img/subscribe.svg" alt="Ícone de Cadastro" />
            </h4>
            <p>Receba em seu email nossos conteúdos jurídicos e convites para eventos.</p>
            <p>
              <a href="https://pt.linkedin.com/" className="linkedin" target="_blank" rel="noopener noreferrer">
                <img src="/assets/img/linkedin-blue.svg" alt="LinkedIn" title="LinkedIn" />
              </a>
              Siga nossa página no <a href="https://pt.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
          <div className="col-lg-8">
            <form id="form-subscribe" onSubmit={handleSubmit(onSubmit)}>
              <input name="__RequestVerificationToken" type="hidden" value="wjJNoDqEOGZTSNPgrOjrVGM2jD4w_j0y1a2exH46yc" />
              <div className="form-row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="nome"
                    className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                    placeholder="Nome"
                    maxLength="30"
                    {...register('nome', { required: 'Por favor, preencha este campo' })}
                  />
                  {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="sobrenome"
                    className={`form-control ${errors.sobrenome ? 'is-invalid' : ''}`}
                    placeholder="Sobrenome"
                    maxLength="90"
                    {...register('sobrenome', { required: 'Por favor, preencha este campo' })}
                  />
                  {errors.sobrenome && <div className="invalid-feedback">{errors.sobrenome.message}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="empresa"
                    className="form-control"
                    placeholder="Empresa"
                    maxLength="120"
                    {...register('empresa')}
                  />
                </div>
                <div className="col-md-6">
                  <select className="form-control" id="pais" name="pais" {...register('pais')}>
                    <option value="">País</option>
                    {countryOptions.map((country, index) => (
                      <option key={index} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="E-mail"
                    maxLength="80"
                    {...register('email', { required: 'E-mail inválido' })}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    name="telefone1"
                    className="form-control"
                    placeholder="Telefone"
                    maxLength="20"
                    {...register('telefone1')}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6 mb-2">
                  <div className="custom-captcha" onClick={handleCaptchaChange}>
                    <div className={`captcha-checkbox ${isCaptchaChecked ? 'checked' : ''}`}>
                      {isCaptchaChecked && <span className="checkmark">✓</span>}
                    </div>
                    <div className="captcha-text">
                      {captchaState === 'initial' && 'Não sou um robô'}
                      {captchaState === 'verifying' && 'Verificando...'}
                      {captchaState === 'verified' && 'Verificado'}
                    </div>
                    <div className="captcha-icon">
                      <img className="captcha-icon" src="/assets/img/reCAPTCHA.png" alt="Captcha Icon" />
                    </div>
                  </div>
                  {captchaState !== 'verified' && (
                    <div className="invalid-feedback d-block">Por favor, marque o reCAPTCHA antes de enviar o formulário.</div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="notice">
                    <a href="" target="_blank">Clique aqui</a> para acessar a nossa política de proteção de dados.
                  </div>
                  <button type="submit" className="btn" disabled={!isCaptchaChecked}>
                    <span>Enviar</span>
                  </button>
                </div>
              </div>
              {message && (
                <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;