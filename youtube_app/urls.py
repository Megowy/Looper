from django.urls import path
from .views import SearchResultsView

urlpatterns = [
    path('search/', SearchResultsView.as_view(), name='youtube_search'),
]
