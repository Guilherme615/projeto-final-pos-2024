import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import FotoWrapper from "../../functions/FotoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const FotoWrapper = new FotoWrapper();
// const albumWrapper = new AlbumWrapper();

const UpdateFoto = () => {
  // const [albuns, setAlbuns] = useState([]);
  const [FotoData, setFotoData] = useState({ title: "", url: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchFoto = async () => {
    try {
      const response = await FotoWrapper.detailFoto("Fotos/", id);
      setFotoData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  
  useEffect(() => {
    
    fetchFoto();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FotoData.url.length > 200) {
      setFieldErrors({ url: "A URL deve ter menos de 200 caracteres." });
      return;
    }
    try {
      await FotoWrapper.updateFoto("Fotos/", id, FotoData);
      navigate("/fotos/");
    } catch (error) {
      setError(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFotoData({ ...FotoData, [name]: value });
  };

  return (
    <>
      <h1>Atualizar foto</h1>
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
            value={FotoData.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            className={`form-control ${fieldErrors.url ? "is-invalid" : ""}`}
            placeholder="Coloque a URL da foto"
            value={FotoData.url}
            onChange={handleChange}
          />
          {fieldErrors.url && (
            <div className="invalid-feedback">{fieldErrors.url}</div>
          )}
        </div>
        <div>
          <Link to={"/fotos/"} className="btn btn-danger">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-success">
            Atualizar
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateFoto;