# 2026 Scouting App (Rebuilt)

Web/PWA scouting app for FRC match scouting.

## Features

- Match record collection with **auton** and **teleop** scoring counters
- Endgame **climb level** selection (Level 1 / 2 / 3)
- Capability toggles: **can go over bump**, **can go under trench**
- Local persistence (device storage)
- Match record **edit** and **delete**
- Data transfer via **QR code send/receive** (protobuf + gzip)
- Import/export match records via JSON file

## Setup

```sh
npm install
```

## Run (dev)

```sh
npm run dev
```

## Build

```sh
npm run build
```