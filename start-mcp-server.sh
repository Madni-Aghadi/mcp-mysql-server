#!/bin/bash

# Navigate to the MCP server directory
cd "$(dirname "$0")"

# Start the MCP server
node build/index.js &

# Save the process ID
echo $! > mcp-server.pid

echo "MCP MySQL Server started with PID $(cat mcp-server.pid)"
echo "To stop the server, run: kill $(cat mcp-server.pid)" 