import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FotoWrapper from "../../functions/FotoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ListFotos.css";

const FotoWrapper = new FotoWrapper();
const albumWrapper = new AlbumWrapper();

const CriarFoto = () => {
  const [albums, setAlbums] = useState([]);
  const [FotoData, setFotoData] = useState({ title: "", url: "", album: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAlbums, setLoadingAlbums] = useState(true);
  const navigate = useNavigate();

  const fetchAlbums = async () => {
    setLoadingAlbums(true);
    try {
      const response = await albumWrapper.listAlbum("albums/");
      setAlbums(response.data || []);
    } catch (error) {
      setError("Erro ao carregar álbuns.");
    } finally {
      setLoadingAlbums(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFotoData({ ...FotoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await FotoWrapper.CriarFoto("Fotos/", FotoData);
      navigate("/Fotos/");
    } catch (error) {
      setError("Erro ao criar a foto. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criar Foto</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="form-container">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              placeholder="Digite o título da foto"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="url" className="form-label">
              URL da Foto
            </label>
            <input
              type="url"
              name="url"
              id="url"
              className="form-control"
              placeholder="https://exemplo.com/foto.jpg"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="album" className="form-label">
              Álbum
            </label>
            <select
              name="album"
              id="album"
              className="form-select"
              required
              onChange={handleChange}
              aria-live="polite"
            >
              <option value="">Selecione um álbum</option>
              {loadingAlbums && <option>Carregando álbuns...</option>}
              {!loadingAlbums && albums.length === 0 && (
                <option disabled>Nenhum álbum encontrado</option>
              )}
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Foto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarFoto;
