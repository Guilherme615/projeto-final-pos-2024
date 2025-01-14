import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import usuarioWrapper from "../../functions/usuarioWrapper";

const apiWrapper = new usuarioWrapper();

const Updateusuario = () => {
  const [usuarioData, setusuarioData] = useState({ name: "" });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchusuario = async () => {
    try {
      const response = await apiWrapper.detailusuario("usuarios/", id);
      setusuarioData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchusuario();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setusuarioData({ ...usuarioData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiWrapper.updateusuario("usuarios/", id, usuarioData);
      navigate("/usuarios/");
    } catch (error) {
      setError("Não foi possível atualizar o usuário");
    }
  };

  return (
    <>
      <h1>Atualizar usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={usuarioData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit">Atualizar</button>
      </form>
    </>
  );
};

export default Updateusuario;