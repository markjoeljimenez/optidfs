# NextJS

A boilerplate for NextJS projects.

## Table of Contents

1. [Installation](#installation)
2. [Testing](#testing)
3. [Deployment](#deployment)
4. [Debugging support](#debugging-support)

## Installation

1. Fill out `.env.example` and rename to `.env`
2. Run `npm i` to install NextJS and other dependencies
3. Run `npm run develop` to run NextJS in dev mode

## Testing

Tests are within the `src/__tests__/` folder and can be watched by running the `npm run test:watch` script.

## Deployment

`eb deploy --profile=draftkings-optimizer`

## Debugging Support

Below is a sample `.vscode/launch.json` that can be used with VS Code

```cli
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Next: Node",
      "runtimeExecutable": "node",
      "runtimeArgs": [
        "--inspect",
        "./node_modules/.bin/next"
      ],
      "port": 9229,
      "console": "integratedTerminal"
    }
  ]
}
```
