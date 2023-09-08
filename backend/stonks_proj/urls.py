"""
URL configuration for stonks_proj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from stonks_app.views import Info, Register, Login, Logout, UpdateData, ManageWatchlist, GetStonkData, GetLastDate, GetSymbol

urlpatterns = [
    path('api/info/', Info.as_view()),
    path('api/register/', Register.as_view()),
    path('api/login/', Login.as_view()),
    path('api/logout/', Logout.as_view()),
    path('api/update/', UpdateData.as_view()),
    path('api/watchlist/', ManageWatchlist.as_view()),
    path('api/watchlist/<str:ticker>', GetStonkData.as_view()),
    path('api/lastdate/', GetLastDate.as_view()),
    path('api/search/', GetSymbol.as_view()),
]
