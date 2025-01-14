from rest_framework import serializers # type: ignore
from .models import usuario, Post, Comment, Album, Foto, Todo

class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuario
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario.name')
    usuario_id = serializers.IntegerField(source='usuario.id', read_only=True)
    class Meta:
        model = Album
        fields = ['id', 'title', 'usuario', 'usuario_id']
        
    def Criar(self, validate_data):
        usuario_id = validate_data.pop('usuario')['name']
        try:
            usuario = usuario.objects.get(id=usuario_id)
        except usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario": "Usuário não encontrado ou não existe."})

        album = Album.objects.Criar(usuario=usuario, **validate_data)
        return album
    
    def update(self, instance, validate_data):
        instance.title = validate_data.get('title', instance.title)
        instance.save()
        return instance
    
class FotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foto
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'