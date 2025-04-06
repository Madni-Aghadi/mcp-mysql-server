#!/usr/bin/env node

// A script to test the MySQL MCP server connect_db function

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

// Try different method names for connecting to the database
const methodNames = ["invoke", "connectTool", "tool", "call", "execute"];
let success = false;

for (const method of methodNames) {
    console.log(`\nTrying method: "${method}"...`);
    
    // Create a JSON-RPC 2.0 request for MCP to connect to the database
    const mcpRequest = {
        "jsonrpc": "2.0",
        "id": "connect-1",
        "method": method,
        "params": {
            "name": "connect_db",
            "arguments": {
                "url": "mysql://root:root@localhost:8889/hbwebsite"
            }
        }
    };

    console.log('Sending request:', JSON.stringify(mcpRequest, null, 2));

    // Execute the server with the request
    const result = spawnSync('node', [serverPath], {
        input: JSON.stringify(mcpRequest) + '\n',
        encoding: 'utf-8',
        cwd: __dirname,
        timeout: 5000
    });

    if (result.error) {
        console.error(`Error with method "${method}":`, result.error.message);
        continue;
    }

    console.log(`Output for method "${method}":`);
    console.log('-----------------');
    console.log(result.stdout);

    if (result.stderr) {
        console.error(`Errors for method "${method}":`);
        console.error('-----------------');
        console.error(result.stderr);
    }

    // Try to parse the output as JSON
    try {
        const jsonLines = result.stdout.split('\n').filter(line => line.trim().startsWith('{'));
        
        if (jsonLines.length > 0) {
            const response = JSON.parse(jsonLines[0]);
            
            if (!response.error) {
                console.log(`✓ Method "${method}" succeeded!`);
                success = true;
                break;
            } else {
                console.error(`✗ Method "${method}" failed:`, JSON.stringify(response.error, null, 2));
            }
        } else {
            console.error(`✗ No valid JSON response with method "${method}"`);
        }
    } catch (error) {
        console.error(`✗ Error parsing response with method "${method}":`, error.message);
    }
}

if (!success) {
    console.error("\n✗ All method attempts failed.");
    console.log("\nDumping .env file contents to check configuration:");
    try {
        const envContent = fs.readFileSync(join(__dirname, '.env'), 'utf8');
        console.log(envContent);
    } catch (err) {
        console.error("Could not read .env file:", err.message);
    }
} else {
    console.log("\n✓ Connection test successful!");
} 