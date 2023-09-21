from django.urls import path
from .views import SearchResultsView, yt_player

urlpatterns = [
    path('youtube_app/', SearchResultsView.as_view(), name='youtube_search'),
    path('youtube_app/<video_id>', yt_player, name='youtube_player'),
]
