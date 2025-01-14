import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import usuarioWrapper from "../../functions/usuarioWrapper";
import TodoWrapper from "../../functions/todoWrapper";
import AlbumWrapper from "../../functions/albumWrapper";
const usuarioWrapper = new usuarioWrapper();
const todoWrapper = new TodoWrapper();
const albumWrapper = new AlbumWrapper();

const Detailusuario = () => {
  const [usuario, setusuario] = useState({});
  const [usuarioTodos, setusuarioTodos] = useState([]);
  const [usuarioAlbuns, setusuarioAlbuns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  let navigate = useNavigate();

  const { id } = useParams();

  const fetchusuario = async () => {
    try {
      setIsLoading(true);
      const response = await usuarioWrapper.detailusuario("usuarios/", id);
      setusuario(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchusuarioTodos = async () => {
    try {
      setIsLoading(true);
      const response = await todoWrapper.listTodo("todos/");
      const todosByusuario = response.data.filter((todo) => todo.usuario_id == id);
      setusuarioTodos(todosByusuario);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchusuarioAlbuns = async () => {
    try {
      setIsLoading(true);
      const response = await albumWrapper.listAlbuns("albuns/");
      const albunsByusuario = response.data.filter((album) => album.usuario_id == id);
      setusuarioAlbuns(albunsByusuario);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchusuario();
    fetchusuarioTodos();
    fetchusuarioAlbuns();
  }, []);

  return (
    <>
      <h1 className="mb-5">Usuário {usuario.name}</h1>
      {error && <p>Ocorreu um erro</p>}

      <div className="row">
        {!isLoading && !error && usuarioTodos.length == 0 && (
          <div className="col-md-6">
            <h3>Tarefas</h3>
            <p>Não há tarefas cadastradas</p>
            <Link to={'/tarefas/cadastrar/'} className="btn btn-primary">Cadastrar tarefa</Link>
          </div>
        )}

        {!isLoading && !error && usuarioAlbuns.length == 0 && (
          <div className="col-md-6">
            <h3>Álbuns</h3>
            <p>Não há álbuns cadastrados</p>
            <Link to={'/albuns/cadastrar/'} className="btn btn-primary">Cadastrar álbum</Link>
          </div>
        )}
      </div>

      <div className="row">
        {!isLoading && !error && usuarioTodos.length > 0 && (
          <div className="col-md-6">
            <h3>Tarefas</h3>
            {usuarioTodos.map((todo) => (
              <div key={todo.id} className="todo">
                <p className="todo_title">{todo.title}</p>
                <span
                  className={
                    todo.is_complete
                      ? "badge text-bg-success"
                      : "badge text-bg-warning"
                  }
                >
                  {todo.is_complete ? "Concluída" : "Não concluída"}
                </span>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && usuarioAlbuns.length > 0 && (
          <div className="col-md-6">
            <h3>Álbuns</h3>
            <div className="album_container">
              {usuarioAlbuns.map((album) => (
                <Link className="btn btn-secondary" key={album.id} to={`/album/${album.id}/fotos/`}>
                  {album.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detailusuario;