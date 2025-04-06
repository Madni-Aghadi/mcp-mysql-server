#!/usr/bin/env node

// Script to start the MCP server and log its output

import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting MCP MySQL Server...');

// Start the server process
const serverProcess = spawn('node', [join(__dirname, 'build', 'index.js')], {
  detached: true,
  stdio: ['ignore', 'pipe', 'pipe']
});

// Save the process ID to a file
writeFileSync(join(__dirname, 'mcp-server.pid'), serverProcess.pid.toString());

console.log(`MCP MySQL Server started with PID ${serverProcess.pid}`);
console.log(`To stop the server, run: node stop-mcp-server.js`);

// Capture and log stdout
serverProcess.stdout.on('data', (data) => {
  console.log(`[MCP Server]: ${data.toString().trim()}`);
});

// Capture and log stderr
serverProcess.stderr.on('data', (data) => {
  console.error(`[MCP Server Error]: ${data.toString().trim()}`);
});

// Unref the process to allow the parent script to exit
serverProcess.unref(); 