#!/usr/bin/env node

// Script to stop the MCP server

import { readFileSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pidFile = join(__dirname, 'mcp-server.pid');

// Check if the PID file exists
if (existsSync(pidFile)) {
  try {
    // Read the PID from the file
    const pid = parseInt(readFileSync(pidFile, 'utf8').trim());
    
    // Try to kill the process
    console.log(`Attempting to stop MCP MySQL Server with PID ${pid}...`);
    
    try {
      process.kill(pid);
      console.log(`Successfully stopped MCP MySQL Server with PID ${pid}`);
    } catch (error) {
      if (error.code === 'ESRCH') {
        console.log(`Process with PID ${pid} not found. It may have already been terminated.`);
      } else {
        console.error(`Failed to stop process: ${error.message}`);
      }
    }
    
    // Remove the PID file
    unlinkSync(pidFile);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
} else {
  console.log('MCP MySQL Server is not running or PID file not found.');
} 