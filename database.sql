CREATE DATABASE StockPilot;
USE StockPilot;

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    category_id INT,
    supplier_id INT,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id) ON DELETE SET NULL
);

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE SET NULL
);

CREATE TABLE Order_Lines (
    order_line_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- Seed database
INSERT INTO Categories (category_name, description) VALUES
    ('Electronics', 'Electronics category'),
    ('Clothing', 'Clothing category'),
    ('Books', 'Books category'),
    ('Home', 'Home category'),
    ('Sports', 'Sports category');

INSERT INTO Suppliers (supplier_name, contact, phone, address) VALUES
    ('Supplier A', 'John Doe', '123-456-7890', '123 Main St, Anytown, USA'),
    ('Supplier B', 'Jane Smith', '987-654-3210', '456 Elm St, Anytown, USA'),
    ('Supplier C', 'Bob Johnson', '555-555-5555', '789 Oak St, Anytown, USA');

INSERT INTO Products (product_name, description, price, stock_quantity, category_id, supplier_id) VALUES
    ('Product A', 'Description for Product A', 99.99, 100, 1, 1),
    ('Product B', 'Description for Product B', 49.99, 50, 2, 2),
    ('Product C', 'Description for Product C', 19.99, 20, 3, 3),
    ('Product D', 'Description for Product D', 9.99, 10, 4, 1),
    ('Product E', 'Description for Product E', 49.99, 50, 5, 2);

INSERT INTO Customers (customer_name, email, phone, address) VALUES
    ('Customer A', 'I9Vt6@example.com', '123-456-7890', '123 Main St, Anytown, USA'),
    ('Customer B', '0mDyX@example.com', '987-654-3210', '456 Elm St, Anytown, USA'),
    ('Customer C', 'fjwFp@example.com', '555-555-5555', '789 Oak St, Anytown, USA');

INSERT INTO Orders (order_date, customer_id) VALUES
    ('2023-06-01', 1),
    ('2023-06-02', 2),
    ('2023-06-03', 3),
    ('2023-06-04', 1),
    ('2023-06-05', 2);

INSERT INTO Order_Lines (order_id, product_id, quantity, unit_price) VALUES
    (1, 1, 2, 99.99),
    (2, 2, 1, 49.99),
    (3, 3, 3, 19.99),
    (4, 4, 1, 9.99),
    (5, 5, 2, 49.99);

