# Generated by Django 3.2 on 2021-04-16 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saved_properties', '0002_savedproperty_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='savedproperty',
            name='image',
            field=models.CharField(max_length=99999),
        ),
        migrations.AlterField(
            model_name='savedproperty',
            name='short_description',
            field=models.CharField(max_length=99999),
        ),
    ]
