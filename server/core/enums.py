from enum import Enum


class BaseEnum(Enum):
    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class PortfolioTransactionType(BaseEnum):
    BUY = 'BUY'
    SELL = 'SELL'
    DIVIDEND = 'DIVIDEND'
    INTEREST = 'INTEREST'
    OTHER = 'OTHER'
