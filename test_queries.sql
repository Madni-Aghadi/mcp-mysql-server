-- Test queries for the hbwebsite database
-- You can use these to test your MCP MySQL server connection with Cursor AI

-- List all tables
SHOW TABLES;

-- Describe a specific table
DESCRIBE booking_order;
DESCRIBE booking_details;

-- Basic SELECT queries
-- Get recent bookings
SELECT * FROM booking_order ORDER BY booking_id DESC LIMIT 5;

-- Get booking details
SELECT * FROM booking_details WHERE booking_id = 38;

-- Join booking_order and booking_details
SELECT 
    bo.booking_id,
    bo.order_id,
    bo.booking_status,
    bo.check_in,
    bo.check_out,
    bd.room_name,
    bd.price,
    bd.total_pay,
    bd.user_name,
    bd.phonenum
FROM 
    booking_order bo
JOIN 
    booking_details bd ON bo.booking_id = bd.booking_id
ORDER BY 
    bo.booking_id DESC
LIMIT 10;

-- Count bookings by status
SELECT 
    booking_status, 
    COUNT(*) as count 
FROM 
    booking_order 
GROUP BY 
    booking_status;

-- Find bookings within a date range
SELECT * 
FROM booking_order 
WHERE check_in >= '2023-01-01' AND check_out <= '2023-12-31';

-- Find bookings for a specific room
SELECT 
    bo.booking_id,
    bo.order_id,
    bo.check_in,
    bo.check_out,
    bd.room_name
FROM 
    booking_order bo
JOIN 
    booking_details bd ON bo.booking_id = bd.booking_id
WHERE 
    bd.room_name = 'Luxury Room';

-- Advanced query with multiple joins (if you have these tables)
-- This may need to be adjusted based on your actual schema
SELECT 
    bo.booking_id,
    bo.order_id,
    bo.booking_status,
    bd.room_name,
    bd.price,
    r.adult_capacity,
    r.children_capacity,
    r.area,
    r.description
FROM 
    booking_order bo
JOIN 
    booking_details bd ON bo.booking_id = bd.booking_id
JOIN 
    rooms r ON bo.room_id = r.id
ORDER BY 
    bo.booking_id DESC
LIMIT 5; 