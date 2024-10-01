from django.db import models

# Local
from core.constants import STOCK_TICKER_SYMBOL_MAX_LENGTH
from core.enums import PortfolioTransactionType


# Create your models here.
class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class StockPortfolio(TimeStampedModel):
    ticker = models.CharField(
        max_length=STOCK_TICKER_SYMBOL_MAX_LENGTH,
        null=False,
        blank=False
    )
    quantity = models.IntegerField()
    price = models.FloatField()
    transaction_type = models.CharField(
        max_length=STOCK_TICKER_SYMBOL_MAX_LENGTH,
        choices=PortfolioTransactionType.choices(),
        null=False,
        blank=False
    )

    def __str__(self):
        return f"{self.ticker} ({self.quantity}) @ {self.price}"
