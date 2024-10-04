# 🚀 SellScaleHood

SellScaleHood is a simplified Robinhood-like stock trading application built as part of a SellScale engineering challenge. The platform allows users to search for stock tickers, buy and sell stocks, and manage their portfolios. The project leverages Django for the backend, Next.js for the frontend, and a SQLite database for storage.

![localhost_3000](https://github.com/user-attachments/assets/0f10c6dd-f42a-4073-acd0-c566bf235871)


## 💡 Context

SellScaleHood empowers users to query specific stock tickers (e.g., $AAPL, $TSLA), buy/sell stocks, and view their portfolios. The backend integrates the **YFinance** API to fetch real-time stock data.

## Features

- **Realtime Stock Search**: Query stock tickers in real-time.
- **Buy/Sell Stocks**: Purchase and sell stocks and update portfolio.
- **Portfolio Management**: View a summary of purchased stocks.

---

## Prerequisites

- **Python 3.8+** for the backend
- **Node.js 16+** for the frontend
- **npm** or **yarn** for dependency management

---

## Installation

### Backend (Django)

1. **Navigate to the `server` directory:**
    ```bash
    cd server
    ```

2. **Create a virtual environment and activate it:**
    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Run database migrations:**
    ```bash
    python manage.py migrate
    ```

5. **Start the backend server:**
    ```bash
    python manage.py runserver 0.0.0.0:8000
    ```

### Frontend (Next.js)

1. **Navigate to the `web-ui` directory:**
    ```bash
    cd web-ui
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:8000`.

---

## Folder Structure

- **Backend**:
  - `server/`: Django project folder, containing settings, models, and views.
- **Frontend**:
  - `web-ui/`: Next.js frontend built with TypeScript and NextUI.

---

## Technical Checklist

- **Frontend**: Built with Next.js and TypeScript.
- **Backend**: Django framework leveraging YFinance API for real-time stock data.
- **Database**: SQLite for storing portfolio data.
- **Design**: Clean and simple UI using NextUI components.

## ToDo (couldn't complete due to the 3 day time constraint and other work)

- [ ] Implement caching using Redis to fetch top stocks and related news articles
- [ ] Setup a one liner run command by leveraging Docker compose
- [ ] More robust metrics and visualizations for the stock data
- [ ] Add tests, handle API requests more gracefully using `react-query` and so on (exponential backoff etc)
