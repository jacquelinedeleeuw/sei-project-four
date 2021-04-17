# Generated by Django 3.2 on 2021-04-17 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saved_properties', '0002_savedproperty_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedproperty',
            name='baths',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='savedproperty',
            name='beds',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='savedproperty',
            name='price',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
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