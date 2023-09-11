# My Stonks: A Personal Stock Watchlist
This is my personal project for Code Platoon's Uniform cohort. I created a full-stack web application with Postgres+Django for the backend and React+Vite for the frontend. On the backend, I utilized MarketStack's API to pull end-of-day stock data, and on the frontend, I used Axios to handle requests to the application's own API and ChartJS to generate charts with the stock data.

There are four [models](./docs/models.png): Users, Stonks, Watchlists, and WatchlistItems. The Users table holds user information and, with Django's token authentication, forms the basis for the user's ability to register, login, and logout of the application. The Stonks table holds stock data from MarketStack and enables watchlist formation, the stock summaries in the watchlist overview, and chart generation. These two tables are independent, and the relationships come from the Watchlists and WatchlistItems tables. The Watchlists table points to a specific user, and the WatchlistItems connects Watchlists with Stonks.

Users can register for an account, which generates an empty watchlist. Then the user can [login](./docs/login-page.png), [search](./docs/ticker-search.png) for stock tickers, and add or remove stocks to/from their [watchlist](./docs/watchlist.png).

The user can also view [charts](./docs/chart.png) of the available data for a particular stock in their watchlist.

The user can also update the database's stock data from the My Account page. If the Update button is [enabled](./docs/my-account-prior.png), the data is ready to be updated, and if the Update button is [disabled](./docs/my-account-after.png), the data is current.
