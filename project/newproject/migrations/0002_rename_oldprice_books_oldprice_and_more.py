# Generated by Django 5.1.1 on 2024-10-04 11:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newproject', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='books',
            old_name='oldPrice',
            new_name='oldprice',
        ),
        migrations.RenameField(
            model_name='books',
            old_name='regularPrice',
            new_name='regularprice',
        ),
        migrations.RenameField(
            model_name='books',
            old_name='specialPrice',
            new_name='specialprice',
        ),
    ]