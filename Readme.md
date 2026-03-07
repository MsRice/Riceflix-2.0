# 🍚 RiceFlix 2.0

A Netflix-style streaming platform clone built with React, TypeScript, Node.js, and Redis.

Features AI-powered content search, profile-based recommendations, and a Backend-for-Frontend (BFF) architecture optimized for performance.

Live Demo: https://riceflix.vercel.app

## Table of Contents

- Overview
- Features
- Architecture
- Tech Stack
- System Design
- Installation
- Running the Project
- Performance Optimizations

- Future Features
- Screenshots
- Lessons Learned

## Overview

RiceFlix 2.0 is a full-stack streaming platform inspired by Netflix.

The application focuses on building production-grade architecture, including:

- Backend-for-Frontend (BFF) pattern
- Redis caching
- AI vector search
- TMDB API integration
- Dockerized services
- Type-safe TypeScript development

## Features

### User Experience

- Multi-profile accounts
- Watchlist / Favorites / History
- Dynamic category rows
- Trailer playback

### Search

- AI semantic search using vector embeddings
- Traditional TMDB search fallback

### Performance

- Redis caching
- Server-side aggregation
- Lazy-loaded components

### Internationalization

- Multi-language UI support

## Architecture

RiceFlix uses a **Backend-for-Frontend (BFF)** architecture.

```
Client (React)
      |
      v
Node.js BFF Server
      |
      |--- MongoDB (Content + Profiles)
      |
      |--- Redis (Cache)
      |
      |--- TMDB API
      |
      |--- AI Embedding Service

```

## Tech Stack

Frontend

- React
- TypeScript
- Vite
- React Router
- i18next

Backend

- Node.js
- Express
- MongoDB
- Mongoose

Infrastructure

- Docker
- Redis
- GitHub Actions

APIs

- TMDB API

AI

- Voyage AI embeddings

## System Design

The backend aggregates TMDB responses and user data into a single optimized response to minimize client-side API calls.

## Installation

Clone the repo

git clone https://github.com/MsRice/Riceflix-2.0

cd riceflix-2.0

## Run with Docker

docker-compose up --build

or

npm install
npm run dev

## Lessons Learned

Building RiceFlix reinforced the importance of caching strategies, API aggregation, and scalable backend architecture.

It also highlighted the performance benefits of the Backend-for-Frontend pattern when integrating multiple data sources.
