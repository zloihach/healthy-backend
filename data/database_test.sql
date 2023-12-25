INSERT INTO "User" (lastname, firstname, midname, dob, hash, salt, email, sex, role, is_active, is_confirmed_email, notification_period, created_at, edited_at)
VALUES ('Иванов', 'Иван', 'Иванович', '1980-01-01', 'hashed_password_1', 'salt_1', 'ivanov@example.com', 'MALE', 'ADMIN', true, true, 7, '2022-01-01', '2022-01-01');

-- Данные для таблицы Child
INSERT INTO "Child" (lastname, firstname, midname, dob, sex, is_active, created_at, updated_at, user_id)
VALUES ('Иванова', 'Мария', 'Ивановна', '2010-01-01', 'FEMALE', true, '2022-01-01', '2022-01-01', 1);

-- Данные для таблицы UserChild
INSERT INTO "UserChild" (user_id, child_id)
VALUES (1, 1);

-- Данные для таблицы Vaccine
INSERT INTO "Vaccine" (name, type, min_age, max_age, created_at, edited_at, description)
VALUES ('Вакцина 1', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 1');
INSERT INTO "Vaccine" (name, type, min_age, max_age, created_at, edited_at, description)
VALUES
    ('Вакцина 6', 'EPIDEMIOLOGY', 48, 60, '2022-01-01', '2022-01-01', 'Описание вакцины 6'),
    ('Вакцина 7', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 7'),
    ('Вакцина 8', 'CALENDAR', 12, 24, '2022-01-01', '2022-01-01', 'Описание вакцины 8'),
    ('Вакцина 9', 'CALENDAR', 24, 36, '2022-01-01', '2022-01-01', 'Описание вакцины 9'),
    ('Вакцина 10', 'EPIDEMIOLOGY', 36, 48, '2022-01-01', '2022-01-01', 'Описание вакцины 10'),
    ('Вакцина 11', 'EPIDEMIOLOGY', 48, 60, '2022-01-01', '2022-01-01', 'Описание вакцины 11'),
    ('Вакцина 12', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 12'),
    ('Вакцина 13', 'CALENDAR', 12, 24, '2022-01-01', '2022-01-01', 'Описание вакцины 13'),
    ('Вакцина 14', 'CALENDAR', 24, 36, '2022-01-01', '2022-01-01', 'Описание вакцины 14'),
    ('Вакцина 15', 'EPIDEMIOLOGY', 36, 48, '2022-01-01', '2022-01-01', 'Описание вакцины 15'),
    ('Вакцина 16', 'EPIDEMIOLOGY', 48, 60, '2022-01-01', '2022-01-01', 'Описание вакцины 16'),
    ('Вакцина 17', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 17'),
    ('Вакцина 18', 'CALENDAR', 12, 24, '2022-01-01', '2022-01-01', 'Описание вакцины 18'),
    ('Вакцина 19', 'CALENDAR', 24, 36, '2022-01-01', '2022-01-01', 'Описание вакцины 19'),
    ('Вакцина 20', 'EPIDEMIOLOGY', 36, 48, '2022-01-01', '2022-01-01', 'Описание вакцины 20'),
    ('Вакцина 21', 'EPIDEMIOLOGY', 48, 60, '2022-01-01', '2022-01-01', 'Описание вакцины 21'),
    ('Вакцина 22', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 22'),
    ('Вакцина 23', 'CALENDAR', 12, 24, '2022-01-01', '2022-01-01', 'Описание вакцины 23'),
    ('Вакцина 24', 'CALENDAR', 24, 36, '2022-01-01', '2022-01-01', 'Описание вакцины 24'),
    ('Вакцина 25', 'EPIDEMIOLOGY', 36, 48, '2022-01-01', '2022-01-01', 'Описание вакцины 25');
-- Данные для таблицы UserVaccine
INSERT INTO "UserVaccine" (vaccine_id, user_id, medical_center, dose, serial_number, vaccination_date, commentary, created_at, updated_at)
VALUES (1, 1, 'Медицинский центр 1', 1.0, 'serial_1', '2022-01-15', 'Комментарий к вакцинации', '2022-01-15', '2022-01-15');

-- Данные для таблицы ChildVaccine
INSERT INTO "ChildVaccine" (vaccine_id, child_id, medical_center, dose, serial_number, vaccination_date, commentary, created_at, updated_at)
VALUES (1, 1, 'Медицинский центр 1', 1.0, 'serial_1', '2022-01-15', 'Комментарий к вакцинации', '2022-01-15', '2022-01-15');

-- Данные для таблицы Notification
INSERT INTO "Notification" (title, text, is_delivered, created_at)
VALUES ('Заголовок уведомления', 'Текст уведомления', false, '2022-01-01');

-- Данные для таблицы UserNotification
INSERT INTO "UserNotification" (user_id, notification_id)
VALUES (1, 1);

INSERT INTO "User" (lastname, firstname, midname, dob, hash, salt, email, sex, role, is_active, is_confirmed_email, notification_period, created_at, edited_at)
VALUES
    ('Петров', 'Петр', 'Петрович', '1985-03-15',  'hashed_password_2', 'salt_2', 'petrov@example.com', 'MALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Сидорова', 'Анна', 'Ивановна', '1990-05-20',  'hashed_password_3', 'salt_3', 'sidorova@example.com', 'FEMALE', 'USER', false, false, 7, '2022-01-01', '2022-01-01'),
    ('Козлов', 'Алексей', 'Сергеевич', '1982-12-10',  'hashed_password_4', 'salt_4', 'kozlov@example.com', 'MALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Иванова', 'Екатерина', 'Ивановна', '1988-08-25',  'hashed_password_5', 'salt_5', 'ivanova@example.com', 'FEMALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Смирнов', 'Дмитрий', 'Александрович', '1975-07-11',  'hashed_password_6', 'salt_6', 'smirnov@example.com', 'MALE', 'ADMIN', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Козлова', 'Ольга', 'Петровна', '1970-09-30',  'hashed_password_7', 'salt_7', 'kozlova@example.com', 'FEMALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Иванов', 'Сергей', 'Иванович', '1995-02-18',  'hashed_password_8', 'salt_8', 'ivanov2@example.com', 'MALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Петрова', 'Наталья', 'Петровна', '1987-04-23',  'hashed_password_9', 'salt_9', 'petrova@example.com', 'FEMALE', 'USER', false, false, 7, '2022-01-01', '2022-01-01'),
    ('Сидоров', 'Александр', 'Петрович', '1999-06-28',  'hashed_password_10', 'salt_10', 'sidorov@example.com', 'MALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01'),
    ('Смирнова', 'Елена', 'Ивановна', '2000-10-05',  'hashed_password_11', 'salt_11', 'smirnova@example.com', 'FEMALE', 'USER', true, true, 7, '2022-01-01', '2022-01-01');

-- Данные для таблицы Child
INSERT INTO "Child" (lastname, firstname, midname, dob,  sex, is_active, created_at, updated_at, user_id)
VALUES
    ('Петрова', 'Маргарита', 'Петровна', '2010-12-01',  'FEMALE', true, '2022-01-01', '2022-01-01', 2),
    ('Петров', 'Михаил', 'Петрович', '2012-08-15',  'MALE', true, '2022-01-01', '2022-01-01', 3),
    ('Сидоров', 'Иван', 'Петрович', '2015-06-20',  'MALE', true, '2022-01-01', '2022-01-01', 4),
    ('Иванова', 'Анастасия', 'Ивановна', '2018-03-10',  'FEMALE', true, '2022-01-01', '2022-01-01', 5),
    ('Смирнов', 'Артем', 'Дмитриевич', '2020-05-11',  'MALE', true, '2022-01-01', '2022-01-01', 6),
    ('Козлова', 'Елизавета', 'Александровна', '2015-09-30',  'FEMALE', true, '2022-01-01', '2022-01-01', 7),
    ('Иванов', 'Максим', 'Сергеевич', '2019-02-18',  'MALE', true, '2022-01-01', '2022-01-01', 8),
    ('Петрова', 'Александра', 'Петровна', '2012-04-05', 'FEMALE', true, '2022-01-01', '2022-01-01', 9),
    ('Сидоров', 'Егор', 'Александрович', '2017-06-28',  'MALE', true, '2022-01-01', '2022-01-01', 10),
    ('Смирнова', 'Мария', 'Дмитриевна', '2019-10-05',  'FEMALE', true, '2022-01-01', '2022-01-01', 11);

-- Данные для таблицы UserChild
INSERT INTO "UserChild" (user_id, child_id)
VALUES
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 4),
    (6, 5),
    (7, 6),
    (8, 7),
    (9, 8),
    (10, 9),
    (11, 10);

INSERT INTO "Vaccine" (name, type, min_age, max_age, created_at, edited_at, description)
VALUES
    ('Вакцина 2', 'CALENDAR', 0, 12, '2022-01-01', '2022-01-01', 'Описание вакцины 2'),
    ('Вакцина 3', 'CALENDAR', 12, 24, '2022-01-01', '2022-01-01', 'Описание вакцины 3'),
    ('Вакцина 4', 'EPIDEMIOLOGY', 24, 36, '2022-01-01', '2022-01-01', 'Описание вакцины 4'),
    ('Вакцина 5', 'EPIDEMIOLOGY', 36, 48, '2022-01-01', '2022-01-01', 'Описание вакцины 5');

-- Данные для таблицы UserVaccine
INSERT INTO "UserVaccine" (vaccine_id, user_id, medical_center, dose, serial_number, vaccination_date, commentary, created_at, updated_at)
VALUES
    (2, 1, 'Медицинский центр 2', 1.0, 'serial_2', '2022-01-20', 'Комментарий к вакцинации 2', '2022-01-20', '2022-01-20'),
    (3, 2, 'Медицинский центр 3', 1.0, 'serial_3', '2022-01-25', 'Комментарий к вакцинации 3', '2022-01-25', '2022-01-25'),
    (4, 3, 'Медицинский центр 4', 1.0, 'serial_4', '2022-01-30', 'Комментарий к вакцинации 4', '2022-01-30', '2022-01-30');

-- Данные для таблицы ChildVaccine
INSERT INTO "ChildVaccine" (vaccine_id, child_id, medical_center, dose, serial_number, vaccination_date, commentary, created_at, updated_at)
VALUES
    (2, 1, 'Медицинский центр 2', 1.0, 'serial_2', '2022-01-20', 'Комментарий к вакцинации 2', '2022-01-20', '2022-01-20'),
    (3, 2, 'Медицинский центр 3', 1.0, 'serial_3', '2022-01-25', 'Комментарий к вакцинации 3', '2022-01-25', '2022-01-25'),
    (4, 3, 'Медицинский центр 4', 1.0, 'serial_4', '2022-01-30', 'Комментарий к вакцинации 4', '2022-01-30', '2022-01-30');

-- Данные для таблицы Publication
-- Добавление данных с учетом нового поля image_url
INSERT INTO "Publication" (full_title, short_title, text, is_active, created_at, updated_at, image_url)
VALUES
    ('Полное название публикации 2', 'Краткое название 2', 'Текст публикации 2', true, '2022-01-02', '2022-01-02', 'https://your-cdn-url.com/path/to/image2.jpg'),
    ('Полное название публикации 3', 'Краткое название 3', 'Текст публикации 3', true, '2022-01-03', '2022-01-03', 'https://your-cdn-url.com/path/to/image3.jpg');

-- Данные для таблицы Notification
INSERT INTO "Notification" (title, text, is_delivered, created_at)
VALUES
    ('Заголовок уведомления 2', 'Текст уведомления 2', false, '2022-01-02'),
    ('Заголовок уведомления 3', 'Текст уведомления 3', false, '2022-01-03');

-- Данные для таблицы UserNotification
INSERT INTO "UserNotification" (user_id, notification_id)
VALUES
    (1, 2),
    (2, 3);

SELECT n.*
FROM "User" u
         JOIN "UserNotification" un ON u.id = un.user_id
         JOIN "Notification" n ON un.notification_id = n.id
WHERE u.id = 1;
