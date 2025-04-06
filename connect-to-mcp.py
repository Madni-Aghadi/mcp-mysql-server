#!/usr/bin/env python3

"""
This script tests if the MCP server is running and accessible.
It sends a simple request to the MCP server to list tables in the database.
"""

import http.client
import json
import sys

HOST = "localhost"
PORT = 12223
PATH = "/"

def test_mcp_connection():
    """Test the connection to the MCP server"""
    print(f"Testing connection to MCP server at {HOST}:{PORT}...")
    
    # Construct the MCP request to list tables
    request_data = json.dumps({
        "tool_name": "list_tables",
        "arguments": {}
    })
    
    try:
        # Connect to the MCP server
        conn = http.client.HTTPConnection(HOST, PORT)
        
        # Send the request
        headers = {"Content-Type": "application/json"}
        conn.request("POST", PATH, body=request_data, headers=headers)
        
        # Get the response
        response = conn.getresponse()
        
        if response.status == 200:
            print(f"✓ Connected to MCP server successfully (HTTP {response.status})")
            
            # Parse the response
            response_data = json.loads(response.read().decode())
            
            if "error" in response_data and response_data["error"]:
                print(f"✗ Server returned an error: {response_data['error']}")
                return False
            
            # Print the tables
            if "result" in response_data:
                print("\nDatabase tables:")
                for table in response_data["result"]:
                    print(f"- {table}")
                return True
            else:
                print(f"✗ Unexpected response format: {response_data}")
                return False
        else:
            print(f"✗ Server returned HTTP {response.status} {response.reason}")
            print(response.read().decode())
            return False
            
    except ConnectionRefusedError:
        print("✗ Connection refused. Make sure the MCP server is running.")
        print("\nTry starting the server with:")
        print("  node run-mcp-server.js")
        return False
    except Exception as e:
        print(f"✗ Error: {type(e).__name__}: {e}")
        return False
    finally:
        # Close the connection
        conn.close()

if __name__ == "__main__":
    if test_mcp_connection():
        print("\n✓ MCP server is running and connected to the MySQL database!")
        sys.exit(0)
    else:
        print("\n✗ Failed to connect to the MCP server or database.")
        sys.exit(1) 