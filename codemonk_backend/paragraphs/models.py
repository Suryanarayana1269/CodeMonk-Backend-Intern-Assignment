from django.db import models
from users.models import User

class Paragraph(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='paragraphs')
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class WordFrequency(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    word = models.CharField(max_length=100)
    count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('user', 'word')

class ParagraphWordCount(models.Model):
    paragraph = models.ForeignKey(Paragraph, on_delete=models.CASCADE)
    word = models.CharField(max_length=100)
    count = models.IntegerField(default=0)

    class Meta:
        unique_together = ('paragraph', 'word')
