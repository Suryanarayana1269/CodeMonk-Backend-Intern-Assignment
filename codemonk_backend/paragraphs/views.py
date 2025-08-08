from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import ParagraphInputSerializer
from .models import Paragraph, ParagraphWordCount
from .tasks import process_paragraphs

class ParagraphSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ParagraphInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        content = serializer.validated_data['content']
        process_paragraphs.delay(request.user.id, content)
        return Response({'message': 'Paragraphs submitted and will be processed asynchronously.'})

class ParagraphSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        word = request.query_params.get('word', '').lower()
        if not word:
            return Response({'error': 'word parameter required'}, status=400)
        paras_qs = Paragraph.objects.filter(user=request.user)
        para_ids = [p.id for p in paras_qs]
        counts = ParagraphWordCount.objects.filter(paragraph_id__in=para_ids, word=word).order_by('-count', '-paragraph__created_date')[:10]
        results = [{
            'paragraph_id': wc.paragraph.id,
            'content': wc.paragraph.content,
            'count': wc.count,
        } for wc in counts]
        return Response({'results': results})
