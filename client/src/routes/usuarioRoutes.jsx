import Listusuarios from '../paginas/usuarios/Listusuario.js';
import Criarusuario from '../paginas/usuarios/Criarusuario.js';
import Updateusuario from '../paginas/usuarios/Updateusuario.jsx';
import Deleteusuario from '../paginas/usuarios/Deleteusuario.js';
import Detailusuario from '../paginas/usuarios/Detailusuario.js'

const usuarioRoutes = [
    {
        path: 'usuarios/',
        element: <Listusuarios />,
    },
    {
        path: 'usuarios/:id/',
        element: <Detailusuario />
    },
    {
        path: 'usuarios/cadastrar/',
        element: <Criarusuario />
    },
    {
        path: 'usuarios/editar/:id/',
        element: <Updateusuario />
    },
    {
        path: 'usuarios/deletar/:id/',
        element: <Deleteusuario />
    },
]

export default usuarioRoutes;