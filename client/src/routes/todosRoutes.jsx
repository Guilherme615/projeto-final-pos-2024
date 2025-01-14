import ListTodos from '../paginas/todos/ListTodos.js';
import CriarTodo from '../paginas/todos/CriarTodo.js';
import UpdateTodo from '../paginas/todos/UpdateTodo.js';
import DeleteTodo from '../paginas/todos/DeleteTodo.js';

const todosRoutes = [
    {
        path: 'tarefas/',
        element: <ListTodos />
    },
    {
        path: 'tarefas/cadastrar/',
        element: <CriarTodo />
    },
    {
        path: 'tarefas/atualizar/:id/',
        element: <UpdateTodo />
    },
    {
        path: 'tarefas/deletar/:id/',
        element: <DeleteTodo />
    }
]

export default todosRoutes