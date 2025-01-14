from django.db import models

class usuario(models.Model):
    name = models.CharField(max_length=100)
    usuarioname = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Post(models.Model):
    usuario = models.ForeignKey(usuario, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=200)
    body = models.TextField()

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=100)
    email = models.EmailField()
    body = models.TextField()

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(verbose_name='Nome', max_length=50)
    usuario = models.ForeignKey(usuario, related_name="usuario", on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Álbum' 
        verbose_name_plural = 'Álbuns'
        
    def __str__(self):
        return f'{self.title}'

class Foto(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="Fotos")
    title = models.CharField(max_length=200)
    url = models.URLField()
    thumbnail_url = models.URLField()

    def __str__(self):
        return self.title

class Todo(models.Model):
    title = models.CharField(max_length=200)
    usuario = models.ForeignKey(usuario, on_delete=models.CASCADE, related_name="todos")
    is_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.title