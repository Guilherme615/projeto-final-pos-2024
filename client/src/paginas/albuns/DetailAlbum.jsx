import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AlbumWrapper from "../../functions/albumWrapper";
import "bootstrap/dist/css/bootstrap.min.css";

const albumWrapper = new AlbumWrapper();

const DetailAlbum = () => {
  const [album, setAlbum] = useState({});
  const [albumFotos, setAlbumFotos] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchAlbumFotos = async () => {
    try {
      const response = await albumWrapper.detailAlbumFotos("albuns/", id);
      setAlbumFotos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const fetchAlbum = async () => {
    try {
      const response = await albumWrapper.detailAlbum("albuns/", id);
      setAlbum(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchAlbum();
    fetchAlbumFotos();
  }, []);

  return (
    <>
      <h1>Álbum {album.title}</h1>
      {albumFotos.length > 0 && (
        <div className="album">
            {albumFotos.map((Foto)=>(
                <img key={Foto.id} src={Foto.url} width={400} />
            ))}
        </div>
      )}
    </>
  );
};

export default DetailAlbum;