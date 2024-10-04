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
    """
    Retrieve information about the top US stocks.

    This view fetches stock information for each symbol in TOP_US_STOCK_SYMBOLS
    using the yfinance library, removes the 'companyOfficers' field, adds news
    information, and returns the data in the response.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A DRF Response object containing stock information and any errors.
    """
    stock_info_list = []
    for symbol in TOP_US_STOCK_SYMBOLS:
        stock = yf.Ticker(symbol)
        stock_info = stock.info
        stock_info.pop("companyOfficers", None)
        stock_info["news"] = stock.news
        stock_info_list.append(stock_info)
    return Response({"data": stock_info_list, "error": None})


@api_view(["GET"])
def lookup_stock(request):
    """
    Lookup information for a specific stock symbol.

    This view fetches stock information for a given symbol using the yfinance library,
    removes the 'companyOfficers' field, adds news information, and returns the data
    in the response. If the symbol is not provided or an error occurs, an error response
    is returned.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A DRF Response object containing stock information and any errors.
    """
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
    """
    Buy or sell a stock and update the portfolio accordingly.

    This view handles buying or selling a stock based on the provided symbol, quantity,
    and action ('buy' or 'sell'). It updates the StockPortfolio model and returns the
    portfolio entry ID in the response. If an error occurs, an error response is returned.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A DRF Response object containing the portfolio entry ID and any errors.
    """
    try:
        symbol = request.data.get("symbol")
        quantity = request.data.get("quantity")
        action = request.data.get("action")

        if not symbol or not quantity or action not in {"buy", "sell"}:
            raise Exception("symbol, quantity and action are required")

        # Fetch the current stock price using yfinance
        try:
            stock = yf.Ticker(symbol)
        except Exception as ex:
            raise Exception(f"Symbol not present in yfinance")
        current_price = stock.history(period="1d")['Close'].iloc[0]

        stock_portfolio_instance = None

        if action == "buy":
            # Save transaction to Portfolio
            try:
                stock_portfolio_instance = StockPortfolio.objects.get(
                    ticker=symbol
                )
                stock_portfolio_instance.quantity += quantity
            except StockPortfolio.DoesNotExist:
                stock_portfolio_instance = StockPortfolio(
                    ticker=symbol,
                    quantity=quantity,
                    buy_price=current_price
                )
            finally:
                stock_portfolio_instance.save()
            return Response({"data": stock_portfolio_instance.id, "error": None})
        else:
            # Sell transaction
            stock_portfolio_instance = StockPortfolio.objects.get(
                ticker=symbol
            )
            stock_portfolio_instance.quantity -= quantity
            stock_portfolio_instance.save()
            stock_portfolio_id = stock_portfolio_instance.id
            if stock_portfolio_instance.quantity == 0:
                stock_portfolio_instance.delete()
            return Response({"data": stock_portfolio_id, "error": None})

    except Exception as ex:
        return Response(
            {"data": None, "error": str(ex)},
            status=HTTPResponseStatus.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def get_portfolio(request):
    """
    Retrieve the current stock portfolio with enhanced information.

    This view fetches all entries from the StockPortfolio model, enhances each entry
    with additional information from yfinance (e.g., current price, profit/loss percent),
    and returns the data in the response.

    Args:
        request (Request): The HTTP request object.

    Returns:
        Response: A DRF Response object containing the enhanced portfolio information and any errors.
    """
    portfolio = StockPortfolio.objects.all()
    # Merge with yfinance data
    response_list = []
    for stock in portfolio:
        stock_info = yf.Ticker(stock.ticker).info
        enhanced_stock = {
            "name": stock_info['longName'],
            "ticker": stock.ticker,
            "quantity": stock.quantity,
            "buy_price": round(stock.buy_price, 2),
            "current_price": round(stock_info['currentPrice'], 2),
            "profit_loss_percent": round(
                ((stock_info['currentPrice'] - stock.buy_price) /
                 stock.buy_price) * 100, 2
            ),
        }
        response_list.append(enhanced_stock)
    return Response({"data": response_list, "error": None}, status=HTTPResponseStatus.HTTP_200_OK)
