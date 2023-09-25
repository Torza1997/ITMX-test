-- Answer 1 Show agent with the highest total order amount (ORDER_AMOUNT) on all theirs orders
SELECT
    a.AGENT_CODE,
    a.AGENT_NAME,
    SUM(o.ORD_AMOUNT) AS TOTAL_ORDER_AMOUNT
FROM
    agents a
    JOIN orders o ON a.AGENT_CODE = o.AGENT_CODE
GROUP BY
    a.AGENT_CODE,
    a.AGENT_NAME
ORDER BY
    TOTAL_ORDER_AMOUNT DESC
LIMIT
    1;

-- Answer 2 Show CUST_CODE, CUST_NAME and the total amount they spent on all their orders with more than 5000.00 total amount (ORDER_AMOUNT)
SELECT
    c.CUST_CODE,
    c.CUST_NAME,
    SUM(o.ORD_AMOUNT) AS TOTAL_ORDER_AMOUNT
FROM
    customer c
    JOIN orders o ON c.CUST_CODE = o.CUST_CODE
GROUP BY
    c.CUST_CODE,
    c.CUST_NAME
HAVING
    SUM(o.ORD_AMOUNT) > 5000.00
ORDER BY
    TOTAL_ORDER_AMOUNT DESC;

-- Answer 3 Show AGENT_CODE and total number of orders during July of 2008 for each agent
SELECT
    o.AGENT_CODE,
    COUNT(*) AS TOTAL_ORDERS_IN_JULY_2008
FROM
    orders o
WHERE
    YEAR(o.ORD_DATE) = 2008
    AND MONTH(o.ORD_DATE) = 7
GROUP BY
    o.AGENT_CODE
ORDER BY
    o.AGENT_CODE;