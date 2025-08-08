from celery import shared_task
from .models import Paragraph, ParagraphWordCount, WordFrequency
from users.models import User
import re
from collections import Counter

def tokenize(text):
    # Customize as needed: lower case, strip punctuation, etc.
    return re.findall(r'\b\w+\b', text.lower())

@shared_task
def process_paragraphs(user_id, content):
    user = User.objects.get(pk=user_id)
    paragraphs = content.split('\n\n')
    for para in paragraphs:
        para_obj = Paragraph.objects.create(user=user, content=para)
        words = tokenize(para)
        counts = Counter(words)
        for word, count in counts.items():
            ParagraphWordCount.objects.create(paragraph=para_obj, word=word, count=count)
            # Global user frequency
            freq_obj, created = WordFrequency.objects.get_or_create(user=user, word=word)
            freq_obj.count += count
            freq_obj.save()
