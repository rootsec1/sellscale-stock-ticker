import yfinance as yf

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status as HTTPResponseStatus

# Local
from core.models import StockPortfolio
from core.serializers import StockPortfolioSerializer
from core.constants import TOP_US_STOCK_SYMBOLS, ALL_STOCK_SYMBOLS


@api_view(["GET"])
def get_top_stocks(request):
    stock_info_list = []
    for symbol in TOP_US_STOCK_SYMBOLS:
        stock = yf.Ticker(symbol)
        stock_info = stock.info
        stock_info.pop("companyOfficers", None)
        stock_info["news"] = stock.news
        stock_info_list.append(stock_info)
    return Response({"data": stock_info_list, "error": None})


@api_view(["GET"])
def search_stock(request):
    try:
        search_string = request.GET.get("search")
        if not search_string:
            raise Exception("Search string not provided")

        search_results = []
        for symbol in ALL_STOCK_SYMBOLS:
            if search_string.strip().upper() in symbol.upper():
                if search_string in symbol:
                    stock = yf.Ticker(symbol)
                    stock_info = stock.info
                    stock_info.pop("companyOfficers", None)
                    search_results.append(stock_info)

        return Response({"data": search_results, "error": None})
    except Exception as ex:
        return Response(
            {"data": None, "error": str(ex)},
            status=HTTPResponseStatus.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def lookup_stock(request):
    try:
        symbol = request.GET.get("symbol")
        if not symbol:
            raise Exception("Ticker symbol not provided")
        stock = yf.Ticker(symbol)
        stock_info = stock.info
        stock_info.pop("companyOfficers", None)
        stock_info["news"] = stock.news
        return Response({"data": stock_info, "error": None})

    except Exception as ex:
        return Response(
            {"data": None, "error": str(ex)},
            status=HTTPResponseStatus.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
def buy_or_sell_stock(request):
    try:
        symbol = request.data.get("symbol")
        quantity = request.data.get("quantity")
        action = request.data.get("action")

        if not symbol or not quantity or not action:
            raise Exception("symbol, quantity and action are required")

        # Fetch the current stock price using yfinance
        stock = yf.Ticker(symbol)
        current_price = stock.history(period="1d")['Close'][0]

        # Save transaction to Portfolio
        new_stock_portfolio_instance = StockPortfolio(
            ticker=symbol,
            quantity=quantity,
            price=current_price,
            transaction_type=action
        )
        new_stock_portfolio_instance.save()
        return Response({"data": new_stock_portfolio_instance.id, "error": None})

    except Exception as ex:
        return Response(
            {"data": None, "error": str(ex)},
            status=HTTPResponseStatus.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def get_portfolio(request):
    portfolio = StockPortfolio.objects.all()
    serializer = StockPortfolioSerializer(portfolio, many=True)
    return Response(serializer.data)
