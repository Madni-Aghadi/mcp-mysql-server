#!/usr/bin/env node

// This script tests if the MCP server is running and can connect to the MySQL database

import http from 'http';

const options = {
  hostname: 'localhost',
  port: 12223,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Define the MCP request to list tables
const requestData = JSON.stringify({
  tool_name: 'list_tables',
  arguments: {}
});

console.log('Testing MCP MySQL server connection...');

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ MCP server is running and responding!');
      try {
        const result = JSON.parse(data);
        if (result.error) {
          console.error('❌ Error from MCP server:', result.error);
        } else {
          console.log('✅ Successfully connected to MySQL database!');
          console.log('\nDatabase tables:');
          result.result.forEach(table => {
            console.log(`- ${table}`);
          });
        }
      } catch (e) {
        console.error('❌ Error parsing response:', e);
        console.error('Raw response:', data);
      }
    } else {
      console.error(`❌ MCP server returned status code ${res.statusCode}`);
      console.error('Response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Connection error:', e.message);
  console.error('\nMake sure:');
  console.error('1. The MCP server is running (use ./start-mcp-server.sh)');
  console.error('2. The server is listening on port 12223');
  console.error('3. Your MySQL database is accessible with the credentials in .env');
});

// Write the request data and end the request
req.write(requestData);
req.end(); 