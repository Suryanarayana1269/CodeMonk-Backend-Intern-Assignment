from rest_framework import serializers
from .models import Paragraph

class ParagraphInputSerializer(serializers.Serializer):
    content = serializers.CharField()
