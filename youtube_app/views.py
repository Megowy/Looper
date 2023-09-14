from django.views.generic import ListView
from apiclient import discovery
from .forms import SearchResult

api_key = 'AIzaSyCGYAiRtgaFXZ1LscCUMDNhkw85R05rsL0'
class SearchResultsView(ListView):
    template_name = 'search_results.html'
    form_class = SearchResult

    def get_queryset(self):
        number_of_results = 50
        query=self.request.GET.get("yt_search")
        youtube = discovery.build('youtube', 'v3', developerKey=api_key)
        request = youtube.search().list(q=query, part='snippet', type='video', maxResults=number_of_results)
        result = request.execute()
        # print(result)
        result_item = result['items']
        # print(result_item)
        result_list =[]
        for nr in range(0, number_of_results):
            result_list.append({"video_id":result_item[nr]['id']['videoId'], "video_thumbnail":result_item[nr]['snippet']['thumbnails']['medium']['url'],
                               "title":result_item[nr]['snippet']['title'], "description":result_item[nr]['snippet']['description']})

        # print(result_list)
        return result_list
