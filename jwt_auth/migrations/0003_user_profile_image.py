# Generated by Django 3.2 on 2021-04-14 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0002_remove_user_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.CharField(default=1, max_length=300),
            preserve_default=False,
        ),
    ]
