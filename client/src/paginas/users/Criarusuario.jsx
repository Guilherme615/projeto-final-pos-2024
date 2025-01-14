import React, { useState } from 'react';
import usuarioWrapper from '../../functions/usuarioWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Listusuario.css'; 

const usuarioWrapper = new usuarioWrapper();

const Criarusuario = () => {
  const [usuarioData, setusuarioData] = useState({ name: '', usuarioname: '', email: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioData({ ...usuarioData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await usuarioWrapper.Criarusuario('usuarios/', usuarioData);

    if (result.success) {
      setSuccess(true);
      setusuarioData({ name: '', usuarioname: '', email: '' });
    } else {
      setError(result.message || 'Erro ao criar usuário');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criar Usuário</h1>
      {success && <div className="alert alert-success">Usuário criado com sucesso!</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={usuarioData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="usuarioname" className="form-label">usuarioname</label>
            <input
              type="text"
              className="form-control"
              id="usuarioname"
              name="usuarioname"
              value={usuarioData.usuarioname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={usuarioData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Criarusuario;
