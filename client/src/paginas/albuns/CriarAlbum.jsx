import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import usuarioWrapper from "../../functions/usuarioWrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import './ListAlbuns'; 

const albumWrapper = new AlbumWrapper();
const usuarioWrapper = new usuarioWrapper();

const CriarAlbum = () => {
  const [usuarios, setusuarios] = useState([]);
  const [albumData, setAlbumData] = useState({ title: "", usuario: "" });
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const fetchusuarios = async () => {
    try {
      const response = await usuarioWrapper.listusuario("usuarios/");
      setusuarios(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchusuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await albumWrapper.CriarAlbum("albuns/", albumData);
      setAlbumData({ title: "", usuario: "" });
      navigate("/albuns/");
    } catch (error) {
      setError("Não foi possível cadastrar o álbum");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criar Álbum</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-container">
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-12 mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuário
            </label>
            <select
              name="usuario"
              id="usuario"
              className={`form-select ${fieldErrors.usuario ? "is-invalid" : ""}`}
              required
              onChange={handleChange}
            >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.name}
                </option>
              ))}
            </select>
            {fieldErrors.usuario && (
              <div className="invalid-feedback">{fieldErrors.usuario}</div>
            )}
          </div>
          <div>
            <button type="submit" className="btn btn-success w-100">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarAlbum;
