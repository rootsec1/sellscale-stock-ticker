from rest_framework.serializers import HyperlinkedModelSerializer

from core.models import StockPortfolio


class StockPortfolioSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = StockPortfolio
        fields = "__all__"
