from rest_framework import viewsets
from .models import usuario, Post, Comment, Album, Foto, Todo
from rest_framework.response import Response
from .serializers import usuarioSerializer, PostSerializer, CommentSerializer, AlbumSerializer, FotoSerializer, TodoSerializer
from django.http import HttpResponse

def inicio(request):
    return HttpResponse("Placeholder API")
     
class usuarioViewSet(viewsets.ModelViewSet):
    queryset = usuario.objects.all()
    serializer_class = usuarioSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    def get_queryset(self):
        usuario_al = self.kwargs.get("usuario_al")
        if usuario_al:
            return Album.objects.filter(usuario=usuario_al)
        return super().get_queryset()
    
class FotoViewSet(viewsets.ModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer