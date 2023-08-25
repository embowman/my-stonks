# from django.shortcuts import render
from .models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)

# Create your views here.
class Register(APIView):

    def post(self, request):
        request.data['username'] = request.data['email']
        user = User.objects.create_user(**request.data)
        token = Token.objects.create(user=user)
        return Response(
            {'user': {'email': user.email}, 'token': token.key},
            status=HTTP_201_CREATED
        )
    
class Login(APIView):

    def post(self, request):
        request.data['username'] = request.data['email']
        user = authenticate(**request.data)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            print(created)
            return Response(
                {'user': {'email': user.email}, 'token': token.key},
                status=HTTP_201_CREATED
            )
        return Response(status=HTTP_400_BAD_REQUEST)