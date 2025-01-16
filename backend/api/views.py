from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class GreetView(APIView):
    def post(self, request):
        name = request.data.get('name', '')
        return Response({"greeting": f"Hello, {name}!"}, status=status.HTTP_200_OK)