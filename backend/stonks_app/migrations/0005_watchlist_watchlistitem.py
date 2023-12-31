# Generated by Django 4.2.4 on 2023-08-30 04:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stonks_app', '0004_remove_stonk_stonk_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Watchlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='WatchlistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num_stonks', models.IntegerField()),
                ('stonk', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='stonks_app.stonk')),
                ('watchlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='stonks_app.watchlist')),
            ],
        ),
    ]
