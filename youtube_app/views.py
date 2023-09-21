from django.views.generic import ListView
from django.shortcuts import render
from googleapiclient import discovery
from .forms import SearchResult
from .addition import get_length

api_key = 'AIzaSyCGYAiRtgaFXZ1LscCUMDNhkw85R05rsL0'


class SearchResultsView(ListView):
    template_name = 'search_results.html'
    form_class = SearchResult

    def get_queryset(self):
        number_of_results = 50
        query = self.request.GET.get("yt_search")
        youtube = discovery.build('youtube', 'v3', developerKey=api_key)
        request = youtube.search().list(q=query, part='snippet', type='video', maxResults=number_of_results)
        result = request.execute()
        # print(result)
        result_item = result['items']
        # print(result_item)
        result_list = []
        for nr in range(0, number_of_results):
            result_list.append({"video_id": result_item[nr]['id']['videoId'],
                                "video_thumbnail": result_item[nr]['snippet']['thumbnails']['medium']['url'],
                                "title": result_item[nr]['snippet']['title'],
                                "description": result_item[nr]['snippet']['description']})

        # print(result_list)
        return result_list


def yt_player(request, video_id):
    print(video_id)
    video_length = get_length(video_id)


    if request.POST.get('start_value'):
        start_video = request.POST.get('start_value')
        stop_video = request.POST.get('stop_value')
        if start_video >= stop_video:
            stop_video = video_length
    else:
        start_video = 0
        stop_video = video_length

    context = {'video_id': video_id, 'length': video_length, 'start_video': start_video, 'stop_video': stop_video}
    print(context)
    return render(request, template_name='youtube_player.html', context=context)


# def player(request, pk):
#     urlval = Song.objects.get(id=pk).song_url
#     parts = Part.objects.filter(song_id=pk).values('start_p', 'stop_p', 'id')
#     length = get_length(urlval)
#
#     part_id = request.POST.get('id_value')
#
#     if request.POST.get('id_value'):
#         start_video = request.POST.get('start_value')
#         stop_video = request.POST.get('stop_value')
#         part_to_save = Part.objects.get(id=part_id)
#         part_to_save.start_p = start_video
#         part_to_save.stop_p = stop_video
#         part_to_save.save()
#
#     else:
#         start_video = 0
#         stop_video = length
#
#     context = {'song_url': urlval, 'start_video': start_video, 'stop_video': stop_video, 'parts': parts,
#                'lenght': length}
#     return render(request, template_name='looper.html', context=context)
