# Cursor AI Integration with MySQL Database

## Overview

This document provides instructions for connecting Cursor AI to your MySQL database using the MCP (Model Context Protocol) server. We've set up the required files and configurations in this directory.

## What We've Learned

1. The MCP MySQL server is designed to work specifically with Cursor AI through the stdio (standard input/output) interface, not as a standalone HTTP server.

2. The server is correctly installed and configured to connect to your MySQL database with these parameters:
   - Host: localhost
   - Port: 8889
   - User: root
   - Password: root
   - Database: hbwebsite

3. The server needs to be invoked directly by Cursor AI rather than running as a background service.

## How to Configure Cursor AI

1. Open Cursor AI application

2. Navigate to Settings → Features → MCP Servers

3. Click on "Add New MCP Server"

4. Fill in the following details:
   - **Name:** MySQL Database
   - **Type:** Command
   - **Command:** The full path to the MCP server's executable:
     ```
     node /Applications/MAMP/htdocs/travelplanner/mcp-mysql-server/build/index.js
     ```

5. Click "Save"

## Testing the Connection

Once configured, you can test the connection by asking Cursor AI to perform database operations:

1. Ask: "Show me all tables in my MySQL database"
2. Ask: "What's the structure of the booking_order table?"
3. Ask: "Show me the last 5 bookings from booking_order"

## Available Database Tables

Based on our testing, your database has these tables:
- admin_cred
- booking_details
- booking_order
- carousel
- contact_details
- facilities
- features
- rating_review
- room_facilities
- room_features
- room_images
- rooms
- settings
- team_details
- user_cred
- user_queries

## Example SQL Queries

We've created a file with example SQL queries that you can use with Cursor AI:
- Location: `/Applications/MAMP/htdocs/travelplanner/mcp-mysql-server/test_queries.sql`

## Troubleshooting

If Cursor AI cannot connect to your database:

1. Ensure MAMP is running and your MySQL server is accessible
2. Verify the database connection details in the `.env` file match your actual configuration
3. Make sure the path in the Command field is correct
4. Restart Cursor AI after making changes

## Limitations

The MCP server does not work as a standalone service, as it's specifically designed to interact directly with Cursor AI through its native integration system. This is why our attempts to run it as an HTTP server were unsuccessful.

## Additional Tools

In addition to the MCP server integration, we've also created:
- `db_connect.py` - A basic Python script to connect to your MySQL database
- `db_query_tool.py` - A comprehensive Python tool for interacting with your database 