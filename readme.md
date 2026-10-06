# EventHive – Event Ticketing Platform

EventHive is a backend REST API for an event ticketing platform. The system allows users to register and authenticate, create and manage events, create tickets, search events, and make and manage bookings.

The backend is developed using Node.js and Express.js, with MongoDB and Mongoose for database management. JWT authentication and Firebase Authentication are used for secure user authentication.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Objectives](#objectives)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Authentication and Security](#authentication-and-security)
- [API Endpoints](#api-endpoints)
- [Booking Logic](#booking-logic)
- [Validation](#validation)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Testing with Thunder Client](#testing-with-thunder-client)
- [HTTP Status Codes](#http-status-codes)
- [Limitations](#limitations)
- [Future Scope](#future-scope)
- [Conclusion](#conclusion)

---

# Project Overview

EventHive provides a RESTful backend for managing an event ticketing system.

The system supports four main entities:

- Users
- Events
- Tickets
- Bookings

Users can authenticate with the system, create and manage their own events, create tickets for events, and book available tickets.

The system also includes authentication, authorization, input validation, ticket availability management, event searching, and Firebase Authentication integration.

---

# Problem Statement

The objective of the project is to develop a backend REST API for an event ticketing platform using Node.js and Express.js.

The system should provide:

- User authentication
- Event creation and management
- Ticket creation and management
- Event search functionality
- Ticket booking
- Booking management
- Quantity and seat availability validation
- JWT-based authentication
- Firebase Authentication integration
- Validation middleware
- Modular routes and controllers
- MongoDB database integration using Mongoose
- API testing and documentation

---

# Proposed Solution

EventHive solves the problem by providing a modular REST API built with Node.js and Express.js.

The application follows a layered structure:

1. The client sends an HTTP request.
2. Express routes identify the requested API endpoint.
3. Authentication and validation middleware process protected requests.
4. Controllers handle the business logic.
5. Mongoose models communicate with MongoDB.
6. The server returns the appropriate response to the client.

JWT authentication is used to protect APIs, while Firebase Authentication provides an additional authentication mechanism.

The booking system also automatically updates ticket availability when bookings are created or deleted.

---

# Objectives

The main objectives of EventHive are:

- Build a modular REST API.
- Implement secure user authentication.
- Store application data in MongoDB.
- Manage events using CRUD operations.
- Create and retrieve event tickets.
- Allow users to book tickets.
- Validate ticket availability.
- Prevent users from accessing other users' bookings.
- Provide event search functionality.
- Implement request validation.
- Integrate Firebase Authentication.
- Provide a maintainable backend architecture.

---

# Features

## User Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- JWT authentication middleware
- Firebase Authentication integration
- Firebase ID token verification

## Event Management

- Create events
- View all events
- View a single event
- Update events
- Delete events
- Search events

## Ticket Management

- Create tickets for events
- View tickets for a specific event
- Store ticket price and quantity
- Track available ticket quantity

## Booking Management

- Create bookings
- View bookings
- Delete bookings
- Calculate total booking price
- Check ticket availability
- Decrease available ticket quantity after booking
- Restore ticket quantity after booking deletion

## Security

- JWT authentication
- User ownership checks
- Authorization
- Password hashing
- Request validation

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JavaScript | Programming language |
| JWT | API authentication |
| bcrypt | Password hashing |
| Firebase Authentication | Authentication service |
| Firebase Admin SDK | Backend Firebase token verification |
| express-validator | Request validation |
| Thunder Client | API testing |
| VS Code | Development environment |

---

# System Architecture

```text
                Client
                  |
                  v
          Express.js Server
                  |
                  v
              Routes
                  |
                  v
          Authentication /
          Validation Middleware
                  |
                  v
             Controllers
                  |
                  v
          Mongoose Models
                  |
                  v
              MongoDB