import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import FotoWrapper from "../../functions/FotoWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListFotos.css';


const FotoWrapper = new FotoWrapper()

const ListTodos = () => {
    const [Fotos, setFotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    const fetchFotos = async () => {
        try {
            setIsLoading(true);
            const response = await FotoWrapper.listFotos('Fotos/');
            setFotos(response.data);
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchFotos()
    }, [])

    return (
        <>
            <h1>Lista de fotos</h1>
            <Link to={'/fotos/cadastrar/'} className="btn btn-primary">Cadastrar foto</Link>

            {/* Se alguma tarefa for deletada */}
            {location.state && location.state.message && (
                <div className={`alert alert-${location.state.type}`}>
                    {location.state.message}
                </div>
            )}

            {/* Se estiver carregando */}
            {isLoading && (<p>Carregando fotos</p>)}

            {/* Se tiver erro */}
            {!isLoading && error && (<p>Erro no cliente</p>)}

            {/* Se tiver tarefas */}
            {!isLoading && !error && Fotos.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Título</td>
                            <td>Álbum</td>
                            <td>Opção</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Fotos.map((Foto) => (
                            <tr key={Foto.id}>
                                <td>{Foto.id}</td>
                                <td>{Foto.title}</td>
                                <td>{Foto.album}</td>
                                <td><img className="Foto" src={Foto.url}/></td>
                                <td>
                                    <Link to={`/fotos/deletar/${Foto.id}/`} className="btn btn-danger">Deletar</Link>
                                    <Link to={`/fotos/atualizar/${Foto.id}/`} className="btn btn-primary">Atualizar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {!isLoading && !error && Fotos.length == 0 && (<p>Fotos não encontradas</p>)}
        </>
    )
}

export default ListTodos