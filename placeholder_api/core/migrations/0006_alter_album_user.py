# Generated by Django 5.1.4 on 2025-01-13 16:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_album_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='usuario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='usuario', to='core.usuario'),
        ),
    ]
