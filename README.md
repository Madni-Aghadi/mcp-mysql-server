# MCP MySQL Server for Cursor AI

This is a configured MCP (Model Context Protocol) server that connects Cursor AI with your MySQL database via phpMyAdmin. This setup allows Cursor AI to execute SQL queries directly on your database, enhancing your development workflow.

## Setup Instructions

### 1. Prerequisites

- Node.js v18 or higher (you have v22.14.0 installed)
- MySQL database (running via MAMP/phpMyAdmin)

### 2. Configuration

The server is configured to connect to your MySQL database with the following parameters:
- Host: localhost
- Port: 8889
- User: root
- Password: root
- Database: hbwebsite

These settings are stored in the `.env` file and can be modified if needed.

### 3. Starting the Server

To start the MCP server:

```bash
./start-mcp-server.sh
```

This will run the server in the background. The script will display the process ID (PID) of the server.

### 4. Stopping the Server

To stop the MCP server:

```bash
./stop-mcp-server.sh
```

### 5. Integrating with Cursor AI

To connect this MCP server with Cursor AI:

1. Open Cursor AI
2. Go to Settings → Features → MCP Servers
3. Click on "Add New MCP Server"
4. Configure the server with:
   - **Name:** MySQL Database
   - **Type:** Command
   - **Command:** The full path to the MCP server's executable: `/Applications/MAMP/htdocs/travelplanner/mcp-mysql-server/build/index.js`

After saving, Cursor AI will be able to interact with your MySQL database, allowing you to execute queries directly through the AI interface.

## Usage Examples

Once connected, you can ask Cursor AI to:

- Retrieve data from tables
- Execute SQL queries
- Analyze your database schema
- Generate SQL queries based on your requirements
- Debug database-related issues

## Troubleshooting

- If the server fails to start, check if MAMP is running and your MySQL server is accessible
- Verify that the database connection parameters in the `.env` file are correct
- Make sure the port 12223 (default MCP port) is not in use by another application
- Check the server's output for any error messages
