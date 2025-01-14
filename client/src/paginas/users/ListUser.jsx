import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import usuarioWrapper from '../../functions/usuarioWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiWrapper = new usuarioWrapper();

const Listusuarios = () => {
    const [usuarios, setusuarios] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const fetchusuarios = async () => {
        try {
            setIsLoading(true);
            const response = await apiWrapper.listusuario('usuarios/');
            if (response.success && Array.isArray(response.data)) {
                setusuarios(response.data);
            } else {
                setusuarios([]);
                setError("Não foi possível carregar os usuários.");
            }
        } catch (error) {
            setError("Algo deu errado ao carregar os usuários.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchusuarios();
    }, []);

    return (
        <>
            <h1>Usuários</h1>
            <Link to={'/usuarios/cadastrar/'} className='btn btn-primary mb-3'>
                Cadastrar usuário
            </Link>

            {location.state?.message && (
                <div className={`alert alert-${location.state.type}`}>
                    Usuário <b>{location.state.usuario}</b> {location.state.message}
                </div>
            )}

            {isLoading && (<p>Carregando usuários...</p>)}
            {error && (<p className="text-danger">{error}</p>)}

            {!isLoading && !error && Array.isArray(usuarios) && usuarios.length === 0 && (
                <p>Não há usuários registrados.</p>
            )}

            {!isLoading && !error && Array.isArray(usuarios) && usuarios.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td><Link to={`/usuarios/${usuario.id}`}>{usuario.name}</Link></td>
                                <td>
                                    
                                    <Link to={`/usuarios/editar/${usuario.id}/`} className="btn btn-outline-primary btn-sm">
                                        Editar
                                    </Link>

                                    
                                    <Link to={`/usuarios/deletar/${usuario.id}/`} className="btn btn-outline-danger btn-sm ms-2">
                                        Deletar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Listusuarios;
    