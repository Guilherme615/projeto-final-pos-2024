import { useNavigate, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import usuarioWrapper from '../../functions/usuarioWrapper'

const apiWrapper = new usuarioWrapper()

const Deleteusuario = () => {
    const [usuarioData, setusuarioData] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchusuario = async () => {
        try {
            const response = await apiWrapper.detailusuario('usuarios/', id);
            setusuarioData(response.data)
        } catch (error) {
            setError('Ocorreu um erro ao pesquisar o usuário')
        }
    };

    useEffect(() => {
        fetchusuario()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiWrapper.deleteusuario('usuarios/', id);
        if (response.status == 204) {
            navigate('/usuarios/', {state: {status: response.status, usuario: usuarioData.name, message: "Usuário deletado com sucesso", type: 'success'}}) 
        } else {
            navigate('/usuarios/', {state: {status: response.status, usuario: usuarioData.name, message: "possui dados vinculados", type: 'danger'}})
        }
    };

    return (
        <>
            {error && (<p>{error}</p>)}

            {!error && (
                <div>
                    <h1>Você realmente quer deletar o usuário: {usuarioData.name}?</h1>
                    <form onSubmit={handleSubmit}>
                        <button type='submit' className='btn btn-danger'>Deletar</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default Deleteusuario;