def load_all_stock_symbols():
    """
    Loads all stock symbols from a file and returns them as a list.

    The function reads stock symbols from the file 'assets/symbols.txt',
    strips any leading or trailing whitespace from each symbol, and 
    returns a list of cleaned stock symbols.

    Returns:
        list: A list of stock symbols as strings.
    """
    # Open the file containing stock symbols in read mode
    with open("assets/symbols.txt", "r") as f:
        # Read all lines from the file
        symbols = f.readlines()

    # Strip whitespace from each symbol and return the list
    return [symbol.strip() for symbol in symbols]
