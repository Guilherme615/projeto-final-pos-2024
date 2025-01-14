import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import TodoWrapper from "../../functions/todoWrapper";
import usuarioWrapper from "../../functions/usuarioWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListTodos'; 

const todoWrapper = new TodoWrapper();
const usuarioWrapper = new usuarioWrapper();

const CriarTodo = () => {
    const [usuarios, setusuarios] = useState([]);
    const [todoData, setTodoData] = useState({ title: '', usuario: '', is_complete: false });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchusuarios = async () => {
        try {
            const response = await usuarioWrapper.listusuario('usuarios/');
            setusuarios(response.data)
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        fetchusuarios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData({ ...todoData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await todoWrapper.CriarTodo('todos/', todoData);
            setTodoData({ title: '', usuario: '', is_complete: false });
            navigate('/tarefas/');
        } catch (error) {
            setError("Não foi possível cadastrar a tarefa");
        };
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Criar Tarefa</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-container">
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="title" className="form-label">Tarefa</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            value={todoData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="usuario" className="form-label">Usuário</label>
                        <select
                            name="usuario"
                            id="usuario"
                            className="form-select"
                            value={todoData.usuario}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione um usuário</option>
                            {usuarios.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success w-100">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CriarTodo;
