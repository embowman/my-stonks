from django.shortcuts import render
from .models import User, Stonk, Watchlist, WatchlistItem
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
import requests
import os
API_ACCESS_KEY = os.environ['API_ACCESS_KEY']


# Create your views here.
class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'email': request.user.email}, status=HTTP_200_OK)
    

class Register(APIView):

    def post(self, request):
        request.data['username'] = request.data['email']
        user = User.objects.create_user(**request.data)

        watchlist = Watchlist(user=user)
        watchlist.full_clean()
        watchlist.save()

        return Response(status=HTTP_201_CREATED)


class Login(APIView):

    def post(self, request):
        request.data['username'] = request.data['email']
        user = authenticate(**request.data)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {'user': {'email': user.email}, 'token': token.key},
                status=HTTP_201_CREATED
            )
        return Response(status=HTTP_400_BAD_REQUEST)


class Logout(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    

class UpdateData(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        params = {
            'access_key': API_ACCESS_KEY,
            'symbols': 'AAPL,MSFT,IBM,INTC,TXN'
        }

        api_result = requests.get('http://api.marketstack.com/v1/eod', params)
        api_response = api_result.json()

        for stock_data in api_response['data']:
            if Stonk.objects.filter(entry_date=stock_data['date']).filter(stonk_symbol=stock_data['symbol']):
                continue


            stonk = Stonk(
                entry_date = stock_data['date'],
                stonk_symbol = stock_data['symbol'],
                stonk_volume = stock_data['volume'],
                stonk_dividend = stock_data['dividend'],
                price_open = stock_data['open'],
                price_high = stock_data['high'],
                price_low = stock_data['low'],
                price_close = stock_data['close'],
            )

            stonk.full_clean()
            stonk.save()

        return Response(api_response, status=HTTP_201_CREATED)


class ManageWatchlist(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = User.objects.get(email=request.user)
        watchlist = WatchlistItem.objects.filter(watchlist=user.id)
        arr = []
        for stonk in watchlist:
            symbol = Stonk.objects.get(id=stonk.stonk_id).stonk_symbol
            stonk_entries = Stonk.objects.filter(stonk_symbol=symbol).order_by('-entry_date')
            current_price = stonk_entries.first().price_close
            previous_price = stonk_entries[1].price_close
            diff = current_price - previous_price
            diff = round(diff, 2)
            arr.append({'symbol': symbol, 'curr': current_price, 'diff': diff})

        return Response(arr, status=HTTP_200_OK)
    
    def put(self, request):

        if request.data['req'] == 'add':
            stonk = Stonk.objects.filter(stonk_symbol=request.data['symbol']).order_by('entry_date').last()
            user = User.objects.get(email=request.user)
            watchlist_item = WatchlistItem(num_stonks=1, watchlist=Watchlist.objects.get(id=user.id), stonk=stonk)
            watchlist_item.full_clean()
            watchlist_item.save()

            return Response(status=HTTP_204_NO_CONTENT)
        
        elif request.data['req'] == 'rem':
            user = User.objects.get(email=request.user)
            watchlist = WatchlistItem.objects.filter(watchlist=user.id)
            for stonk in watchlist:
                if Stonk.objects.get(id=stonk.stonk_id).stonk_symbol == request.data['symbol']:
                    WatchlistItem.objects.get(id=stonk.id).delete()
                    return Response(status=HTTP_204_NO_CONTENT)
        
        return Response(status=HTTP_400_BAD_REQUEST)


class GetStonkData(APIView):

    def get(self, request, ticker):
        stonk_entries = Stonk.objects.filter(stonk_symbol=ticker).order_by('entry_date')
        dates = []
        highs = []
        lows = []
        for entry in stonk_entries:
            dates.append(entry.entry_date)
            highs.append(entry.price_high)
            lows.append(entry.price_low)
        return Response({'dates': dates, 'highs': highs, 'lows': lows}, status=HTTP_201_CREATED)


class GetLastDate(APIView):

    def get(self, request):
        return Response(Stonk.objects.all().order_by('entry_date').last().entry_date, status=HTTP_201_CREATED)


class GetSymbol(APIView):

    def post(self, request):
        symbols = set(Stonk.objects.values_list('stonk_symbol', flat=True))
        if request.data['symbol'] in symbols:
            return Response(status=HTTP_204_NO_CONTENT)
        return Response(status=HTTP_200_OK)