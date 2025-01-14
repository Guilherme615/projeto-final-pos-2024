import ListTodos from "../paginas/Fotos/ListFotos";
import CriarFoto from "../paginas/Fotos/CriarFoto";
import UpdateFoto from "../paginas/Fotos/UpdateFoto";
import DeleteFoto from "../paginas/Fotos/DeleteFoto";

const FotosRoutes = [
    {
        path: 'fotos/',
        element: <ListTodos />
    },
    {
        path: 'fotos/atualizar/:id/',
        element: <UpdateFoto />
    },
    {
        path: 'fotos/cadastrar/',
        element: <CriarFoto />
    },
    {
        path: 'fotos/deletar/:id/',
        element: <DeleteFoto />
    }
]

export default FotosRoutes