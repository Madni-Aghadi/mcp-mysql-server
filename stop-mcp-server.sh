#!/bin/bash

# Navigate to the MCP server directory
cd "$(dirname "$0")"

# Check if the PID file exists
if [ -f mcp-server.pid ]; then
    # Get the PID
    PID=$(cat mcp-server.pid)
    
    # Kill the process
    if kill $PID 2>/dev/null; then
        echo "Stopped MCP MySQL Server with PID $PID"
    else
        echo "Failed to stop MCP MySQL Server. Process with PID $PID not found."
    fi
    
    # Remove the PID file
    rm mcp-server.pid
else
    echo "MCP MySQL Server is not running or PID file not found."
fi 