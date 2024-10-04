from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status as HTTPResponseStatus


@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok"}, status=HTTPResponseStatus.HTTP_200_OK)
