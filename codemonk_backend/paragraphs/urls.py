from django.urls import path
from .views import ParagraphSubmitView, ParagraphSearchView

urlpatterns = [
    path('', ParagraphSubmitView.as_view(), name='paragraph-submit'),
    path('search/', ParagraphSearchView.as_view(), name='paragraph-search'),
]
