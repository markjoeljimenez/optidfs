# Optidfs

:globe_with_meridians: https://optidfs.com/

A web app that generates the most optimized lineups for DraftKings.

## Table of Contents

1. [Features](#features)
2. [Todo](#todo)
3. [Developers](#developers)
4. [Contributing](#contributing)

## Features

1. Supports most sports on DraftKings
    - (does not support: LOL)
2. Requests directly from DraftKings' API
3. Import/export .csv
4. Search by player, team, position
5. Generate multiple lineups
6. Basic rules:
    - Lock players
    - Number of players from same team
    - Number of specific positions
    - Minimum salary cap
    - Maximum repeating players
    - Projected Ownership
7. Stacking (team, player, custom)

## Todo

1. Add other dfs providers (Yahoo, Fanduel, etc)
2. More [pydfs](https://github.com/DimaKudosh/pydfs-lineup-optimizer) rules
3. Implement login service and SQL database
4. View players stats/analytics page

## Developers

This project uses [pydfs](https://github.com/DimaKudosh/pydfs-lineup-optimizer) to optimize the lineups and a [Python + Flask backend](https://github.com/markjoeljimenez/draftkings-optimizer.backend) to serve endpoints.

### Installation

1. Ensure [backend](https://github.com/markjoeljimenez/draftkings-optimizer.backend) is running
2. Update, fill out, and rename `.env.example` to `.env`
3. Run `npm i` to install NextJS and other dependencies
4. Run `npm run develop` to run NextJS in dev mode

### Testing

This project uses Jest for front-end testing.

-   Run `npm run test` to run all tests
-   Alternatively, run `npm run test:watch` to start NextJS in dev mode and watch all tests

**NOTE**: All tests are run during a pull request/push via Github Actions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

test
