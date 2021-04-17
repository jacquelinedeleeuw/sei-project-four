# Generated by Django 3.2 on 2021-04-17 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('saved_properties', '0003_auto_20210417_0915'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedproperty',
            name='property_type',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='savedproperty',
            name='receptions',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]