import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from groq import Groq

GROQ_API_KEY = "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"

SYSTEM_PROMPT = """You are a helpful assistant for TradeFlow, a professional import and export company based in Addis Ababa, Ethiopia.

You help users with:
- Information about import/export products and services
- Shipping and logistics questions
- Customs clearance guidance
- Quote requests and pricing inquiries
- General trade regulations and documentation

Always be professional, concise, and helpful. If you don't know something specific about TradeFlow's pricing or availability, suggest the user contact the team directly or request a quote through the website."""


@csrf_exempt
@require_http_methods(["POST"])
def chatbot_view(request):
    try:
        body = json.loads(request.body)
        user_message = body.get("message", "").strip()
        history = body.get("messages", [])

        if not user_message:
            return JsonResponse({"error": "Message is required"}, status=400)

        client = Groq(api_key=GROQ_API_KEY)

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        for msg in history[-10:]:
            role = "assistant" if msg.get("role") == "ASSISTANT" else "user"
            messages.append({"role": role, "content": msg.get("content", "")})
        messages.append({"role": "user", "content": user_message})

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=500,
            temperature=0.7,
        )

        reply = response.choices[0].message.content.strip()
        return JsonResponse({"reply": reply})

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
