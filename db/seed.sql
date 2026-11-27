INSERT INTO clients (name, phone) VALUES 
('Иван Иванов', '+79991112233'), 
('Петр Петров', '+79994445566'), 
('Анна Смирнова', '+79997778899');

INSERT INTO devices (model, serial_number, client_id) VALUES 
('iPhone 13', 'SN123456', 1), 
('Samsung TV', 'SN789012', 2), 
('Ноутбук ASUS', 'SN345678', 3);

INSERT INTO masters (name, specialization) VALUES 
('Олег Мастеров', 'Смартфоны'), 
('Дмитрий Ремонтов', 'Бытовая техника');

INSERT INTO requests (description, status, client_id, device_id, master_id) VALUES 
('Разбит экран', 'in_progress', 1, 1, 1), 
('Не включается', 'new', 2, 2, NULL), 
('Не работает клавиатура', 'done', 3, 3, 2);
