from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Stonk(models.Model):
    entry_date = models.DateTimeField()
    stonk_symbol = models.CharField()
    stonk_volume = models.IntegerField()
    stonk_dividend = models.FloatField()
    price_open = models.FloatField()
    price_high = models.FloatField()
    price_low = models.FloatField()
    price_close = models.FloatField()

class Watchlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

class WatchlistItem(models.Model):
    num_stonks = models.IntegerField()
    watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE)
    stonk = models.ForeignKey(Stonk, on_delete=models.CASCADE)