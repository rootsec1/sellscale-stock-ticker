def load_all_stock_symbols():
    with open("assets/symbols.txt", "r") as f:
        symbols = f.readlines()
    return [symbol.strip() for symbol in symbols]
