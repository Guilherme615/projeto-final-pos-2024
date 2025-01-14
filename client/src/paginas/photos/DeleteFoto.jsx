import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import FotoWrapper from '../../functions/FotoWrapper';

const FotoWrapper = new FotoWrapper();

const DeleteFoto = () => {
    const [Foto, setFoto] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchFoto = async () => {
        try {
            const response = await FotoWrapper.detailFoto('Fotos/', id);
            setFoto(response.data);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchFoto();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await FotoWrapper.deleteFoto('Fotos/', id);
        if (response.status == 204) {
            navigate('/fotos/', { state: { message: "Foto deletada com sucesso", type: "success" } });
        } else {
            navigate('/fotos/', { state: { message: "Erro ao excluir foto", type: "danger" } });
        }
    }

    return (
        <>
            <h1>Deletar foto <img className='Foto' src={Foto.url}/> ? </h1>

            {error && (<p>Foto não encontrada</p>)}

            {!error && Foto && (
                <form onSubmit={handleSubmit}>
                    <Link to={'/fotos/'} className='btn btn-success'>Cancelar</Link>
                    <button type='submit' className='btn btn-danger'>Deletar</button>
                </form>
            )}
        </>
    )
}

export default DeleteFoto;