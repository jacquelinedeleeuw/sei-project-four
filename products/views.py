import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views import View

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSessionView(View):
    def post(self, _request, *args, **kwargs):
        YOUR_DOMAIN = 'http://localhost:8000/'

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'gbp',
                        'unit_amount': 14999,
                        'product_data': {
                            'name': 'Yieldly Subscription',
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=YOUR_DOMAIN + settings.STRIPE_PUBLISHABLE_KEY,
            cancel_url=YOUR_DOMAIN + 'cancel',
        )

        return JsonResponse({
            'id': checkout_session.id
        })