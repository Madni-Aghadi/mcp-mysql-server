# Setup Guide: Connecting Cursor AI to MySQL Database

This guide explains how to connect Cursor AI to your MySQL database via an MCP (Model Context Protocol) server. This connection allows Cursor AI to directly execute SQL queries on your database.

## Prerequisites

- MAMP/phpMyAdmin is running with your MySQL database
- Node.js is installed (you have v22.14.0)
- The MCP MySQL server is installed (already set up in this directory)

## Database Connection Details

The MCP server is configured to connect to:
- Host: localhost
- Port: 8889
- User: root
- Password: root
- Database: hbwebsite

These settings are stored in the `.env` file.

## Setting Up in Cursor AI

Since the MCP server works via the command-line interface, you need to add it to Cursor AI as follows:

1. Open Cursor AI
2. Go to **Settings → Features → MCP Servers**
3. Click on "Add New MCP Server"
4. Configure the server with:
   - **Name:** MySQL Database
   - **Type:** Command
   - **Command:** The full path to the MCP server's executable:
     ```
     node /Applications/MAMP/htdocs/travelplanner/mcp-mysql-server/build/index.js
     ```

5. Click "Save"

## Using Cursor AI with MySQL

Once set up, you can ask Cursor AI to:

1. Query your database tables
   - "Show me all tables in my database"
   - "Get the first 5 bookings from booking_order"

2. Generate SQL queries
   - "Create a SQL query to find all bookings after March 1st"
   - "Help me write a query to join booking_order and booking_details tables"

3. Analyze database schema
   - "Describe the structure of the booking_order table"
   - "What fields are available in the booking_details table?"

## Troubleshooting

If Cursor AI can't connect to your database:

1. Make sure MAMP/phpMyAdmin is running and the MySQL server is accessible
2. Verify the database connection parameters in the `.env` file
3. Ensure you've added the MCP server correctly in Cursor AI settings
4. Check that the path to the index.js file is correct

## Examples of MySQL Queries You Can Ask Cursor AI

```
Show me the user with ID 1
```

```
Find all bookings with status 'booked'
```

```
Count how many bookings are in each status
```

```
Join booking_order and booking_details to show complete booking information
``` 