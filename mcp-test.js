#!/usr/bin/env node

// A simple script to test the MySQL MCP server functions using JSON-RPC 2.0 format

import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the MCP server script
const serverPath = join(__dirname, 'build', 'index.js');

// Check if the server script exists
if (!fs.existsSync(serverPath)) {
    console.error(`Error: Server script not found at ${serverPath}`);
    process.exit(1);
}

console.log(`Testing MCP MySQL server at: ${serverPath}`);

// Create a JSON-RPC 2.0 request for MCP to list tables
const mcpRequest = {
    "jsonrpc": "2.0",
    "id": "test-1",
    "method": "invoke",
    "params": {
        "name": "list_tables",
        "arguments": {
            "random_string": "test"
        }
    }
};

console.log('Sending request:', JSON.stringify(mcpRequest, null, 2));

// Execute the server with the request
const result = spawnSync('node', [serverPath], {
    input: JSON.stringify(mcpRequest) + '\n',
    encoding: 'utf-8',
    cwd: __dirname
});

// Check for spawn errors
if (result.error) {
    console.error('Error executing MCP server:', result.error.message);
    process.exit(1);
}

console.log('MCP Server Output:');
console.log('-----------------');
console.log(result.stdout);

// Check if there were any errors
if (result.stderr) {
    console.error('MCP Server Errors:');
    console.error('-----------------');
    console.error(result.stderr);
}

// Try to parse the output as JSON
try {
    // The output may have multiple lines - try to find a JSON object
    const jsonLines = result.stdout.split('\n').filter(line => line.trim().startsWith('{'));
    
    if (jsonLines.length > 0) {
        const response = JSON.parse(jsonLines[0]);
        
        if (response.error) {
            console.error('MCP Error:', JSON.stringify(response.error, null, 2));
        } else if (response.result) {
            console.log('\nDatabase Tables:');
            console.log('-----------------');
            const tables = Array.isArray(response.result) ? response.result : [];
            tables.forEach((table, index) => {
                console.log(`${index + 1}. ${table}`);
            });
        } else {
            console.log('Response:', JSON.stringify(response, null, 2));
        }
    } else {
        console.error('No valid JSON response found in output');
    }
} catch (error) {
    console.error('Error parsing MCP server response:', error.message);
} 