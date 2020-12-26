# DraftKings Optimizer

:globe_with_meridians: https://optidfs.com/

A web app that generates the most optimized lineups for DraftKings.

## Table of Contents

1. [Features](#features)
2. [Todo](#todo)
3. [Contributing](#contributing)
4. [Developers](#developers)

## Features

1. Supports most sports on DraftKings (exception is LOL)
2. Requests directly from DraftKings so users don't have to manually upload .csv files
3. Import/export .csv
4. Search by player, team, position
5. Generate multiple lineups
6. Basic rules:
    - Lock players
    - Number of players from same team
    - Number of specific positions
    - Minimum salary cap
    - Maxiomum repeating players
    - Projected Ownership

## Todo

1. Add other dfs providers (Yahoo, Fanduel, etc)
2. More [pydfs](https://github.com/DimaKudosh/pydfs-lineup-optimizer) rules
3. Implement login service and SQL database
4. View players stats/analytics page

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Developers

This project uses [pydfs](https://github.com/DimaKudosh/pydfs-lineup-optimizer) to optimize the lineups and a [Python + Flask backend](https://github.com/markjoeljimenez/draftkings-optimizer.backend) to serve endpoints.

### Installation

1. Update, fill out, and rename `.env.example` to `.env`
2. Run `npm i` to install NextJS and other dependencies
3. Run `npm run develop` to run NextJS in dev mode
