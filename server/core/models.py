# Local imports
from core.constants import STOCK_TICKER_SYMBOL_MAX_LENGTH
from django.db import models

# Create your models here.


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating 
    'created_at' and 'updated_at' fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class StockPortfolio(TimeStampedModel):
    """
    A model representing a stock portfolio entry.

    Attributes:
        ticker (str): The stock ticker symbol.
        quantity (int): The number of shares.
        buy_price (float): The price at which the stock was bought.
    """
    ticker = models.CharField(
        max_length=STOCK_TICKER_SYMBOL_MAX_LENGTH,
        null=False,
        blank=False
    )
    quantity = models.IntegerField()
    buy_price = models.FloatField()

    def __str__(self):
        """
        Returns a string representation of the stock portfolio entry.

        Returns:
            str: A string in the format 'ticker (quantity) @ buy_price'.
        """
        return f"{self.ticker} ({self.quantity}) @ {self.buy_price}"
