#!/usr/bin/env node

// A standalone script to run the MCP MySQL server

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the server executable
const serverPath = join(__dirname, 'build', 'index.js');

// Create a log file to store output
const logFile = fs.openSync(join(__dirname, 'mcp-server.log'), 'a');

console.log('Starting MySQL MCP server...');
console.log(`Server executable: ${serverPath}`);
console.log(`Logging to: ${join(__dirname, 'mcp-server.log')}`);

// Start the server in HTTP mode
const serverProcess = spawn('node', [serverPath, '--http'], {
  detached: false,
  stdio: ['ignore', logFile, logFile]
});

serverProcess.on('error', (err) => {
  console.error(`Failed to start MCP server: ${err.message}`);
  process.exit(1);
});

serverProcess.on('exit', (code, signal) => {
  if (code !== 0) {
    console.error(`MCP server exited with code ${code} and signal ${signal}`);
    process.exit(1);
  }
});

console.log('MCP server started successfully!');
console.log('The server should now be available at http://localhost:12223');
console.log('Press Ctrl+C to stop the server');

// Keep the script running
process.on('SIGINT', () => {
  console.log('Stopping MCP server...');
  serverProcess.kill();
  fs.closeSync(logFile);
  process.exit(0);
}); 