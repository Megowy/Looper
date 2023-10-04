from django.urls import path
from .views import SearchResultsView, yt_player

urlpatterns = [
    path('/', SearchResultsView.as_view(), name='youtube_search'),
    path('/<video_id>', yt_player, name='youtube_player'),
]
