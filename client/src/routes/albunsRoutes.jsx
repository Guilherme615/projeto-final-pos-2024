import ListAlbuns from "../paginas/albuns/ListAlbuns";
import CriarAlbum from "../paginas/albuns/CriarAlbum";
import UpdateAlbum from "../paginas/albuns/UpdateAlbum";
import DeleteAlbum from "../paginas/albuns/DeleteAlbum";
import DetailAlbum from "../paginas/albuns/DetailAlbum";

const albunsRoutes = [
    {
        path: 'albuns/',
        element: <ListAlbuns />
    },
    {
        path: 'album/:id/fotos/',
        element: <DetailAlbum />
    },
    {
        path: 'albuns/cadastrar/',
        element: <CriarAlbum />
    },
    {
        path: 'albuns/atualizar/:id/',
        element: <UpdateAlbum />
    },
    {
        path: 'albuns/deletar/:id/',
        element: <DeleteAlbum />
    }
]

export default albunsRoutes;