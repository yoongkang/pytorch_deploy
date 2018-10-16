from django.shortcuts import render
from .lstm_model import rank_text, split_text
import uuid
import torch
from django.http import JsonResponse, HttpResponseBadRequest

# Create your views here.

def rank(request):
    text = request.GET.get('text')
    if not text:
        return JsonResponse(data={
            "data": [{
                'order': 0, 'text': '',
                'toxic': 0, 'severe_toxic': 0,
                'obscene': 0, 'threat': 0,
                'insult': 0, 'identity_hate': 0,
            }]
        })
    texts = split_text(text)

    output = [
        {
            **rank_text(token), **{"order": i, "text": token}
        }
        for i, token in enumerate(texts)
    ]
    return JsonResponse(data={'data': output})
