from rest_framework.routers import DefaultRouter # type: ignore
from .views import usuarioViewSet, PostViewSet, CommentViewSet, AlbumViewSet, FotoViewSet
from django.urls import path # type: ignore
from . import views


urlpatterns = [
    path('', views.inicio, name='inicio'),  

]
router = DefaultRouter()
router.register(r'usuarios', usuarioViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'Fotos', FotoViewSet)
router.register(r'todos', views.TodoViewSet)

urlpatterns = router.urls
from django.urls import path # type: ignore
from . import views

