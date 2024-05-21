INSERT INTO "Vaccine" (name, type, min_age, max_age, description, created_at,edited_at) VALUES
                                                                                  ('Первая вакцинация против вирусного гепатита B', 'CALENDAR', 0, 0, 'Новорожденные в первые 24 часа жизни', NOW(),NOW()),
                                                                                  ('Вакцинация против туберкулеза', 'CALENDAR', 0, 7, 'Новорожденные на 3 - 7 день жизни', NOW(),NOW()),
                                                                                  ('Вторая вакцинация против вирусного гепатита B', 'CALENDAR', 1, 1, 'Дети 1 месяц', NOW(),NOW()),
                                                                                  ('Третья вакцинация против вирусного гепатита B (группы риска)', 'CALENDAR', 2, 2, 'Дети 2 месяца', NOW(),NOW()),
                                                                                  ('Первая вакцинация против пневмококковой инфекции', 'CALENDAR', 2, 2, 'Дети 2 месяца', NOW(),NOW()),
                                                                                  ('Первая вакцинация против дифтерии, коклюша, столбняка', 'CALENDAR', 3, 3, 'Дети 3 месяца', NOW(),NOW()),
                                                                                  ('Первая вакцинация против полиомиелита', 'CALENDAR', 3, 3, 'Дети 3 месяца', NOW(),NOW()),
                                                                                  ('Первая вакцинация против гемофильной инфекции типа b', 'CALENDAR', 3, 3, 'Дети 3 месяца', NOW(),NOW()),
                                                                                  ('Вторая вакцинация против дифтерии, коклюша, столбняка', 'CALENDAR', 4, 4, 'Дети 4,5 месяца', NOW(),NOW()),
                                                                                  ('Вторая вакцинация против гемофильной инфекции типа b', 'CALENDAR', 4, 4, 'Дети 4,5 месяца', NOW(),NOW()),
                                                                                  ('Вторая вакцинация против полиомиелита', 'CALENDAR', 4, 4, 'Дети 4,5 месяца', NOW(),NOW()),
                                                                                  ('Вторая вакцинация против пневмококковой инфекции', 'CALENDAR', 4, 4, 'Дети 4,5 месяца', NOW(),NOW()),
                                                                                  ('Третья вакцинация против дифтерии, коклюша, столбняка', 'CALENDAR', 6, 6, 'Дети 6 месяцев', NOW(),NOW()),
                                                                                  ('Третья вакцинация против вирусного гепатита B', 'CALENDAR', 6, 6, 'Дети 6 месяцев', NOW(),NOW()),
                                                                                  ('Третья вакцинация против полиомиелита', 'CALENDAR', 6, 6, 'Дети 6 месяцев', NOW(),NOW()),
                                                                                  ('Третья вакцинация против гемофильной инфекции типа b', 'CALENDAR', 6, 6, 'Дети 6 месяцев', NOW(),NOW()),
                                                                                  ('Вакцинация против кори, краснухи, эпидемического паротита', 'CALENDAR', 12, 12, 'Дети 12 месяцев', NOW(),NOW()),
                                                                                  ('Четвертая вакцинация против вирусного гепатита B (группы риска)', 'CALENDAR', 12, 12, 'Дети 12 месяцев', NOW(),NOW()),
                                                                                  ('Ревакцинация против пневмококковой инфекции', 'CALENDAR', 15, 15, 'Дети 15 месяцев', NOW(),NOW()),
                                                                                  ('Первая ревакцинация против дифтерии, коклюша, столбняка', 'CALENDAR', 18, 18, 'Дети 18 месяцев', NOW(),NOW()),
                                                                                  ('Первая ревакцинация против полиомиелита', 'CALENDAR', 18, 18, 'Дети 18 месяцев', NOW(),NOW()),
                                                                                  ('Ревакцинация против гемофильной инфекции типа b', 'CALENDAR', 18, 18, 'Дети 18 месяцев', NOW(),NOW()),
                                                                                  ('Вторая ревакцинация против полиомиелита', 'CALENDAR', 20, 20, 'Дети 20 месяцев', NOW(),NOW()),
                                                                                  ('Ревакцинация против кори, краснухи, эпидемического паротита', 'CALENDAR', 72, 72, 'Дети 6 лет', NOW(),NOW()),
                                                                                  ('Третья ревакцинация против полиомиелита', 'CALENDAR', 72, 72, 'Дети 6 лет', NOW(),NOW()),
                                                                                  ('Вторая ревакцинация против дифтерии, столбняка', 'CALENDAR', 84, 84, 'Дети 6 - 7 лет', NOW(),NOW()),
                                                                                  ('Ревакцинация против туберкулеза', 'CALENDAR', 84, 84, 'Дети 6 - 7 лет', NOW(),NOW()),
                                                                                  ('Третья ревакцинация против дифтерии, столбняка', 'CALENDAR', 168, 168, 'Дети 14 лет', NOW(),NOW()),
                                                                                  ('Ревакцинация против дифтерии, столбняка', 'CALENDAR', 216, 216, 'Взрослые от 18 лет', NOW(),NOW()),

                                                                                  -- Вакцины по эпидемическим показаниям
                                                                                  ('Против туляремии', 'EPIDEMIOLOGY', 84, 6240, 'Лица, проживающие на энзоотичных по туляремии территориях', NOW(),NOW()),
                                                                                  ('Против чумы', 'EPIDEMIOLOGY', 24, 6240, 'Лица, временно или постоянно находящиеся на территории природного очага', NOW(),NOW()),
                                                                                  ('Против бруцеллеза', 'EPIDEMIOLOGY', 864, 6240, 'Лица, работающие с живыми культурами возбудителя бруцеллеза', NOW(),NOW()),
                                                                                  ('Против сибирской язвы', 'EPIDEMIOLOGY', 672, 6240, 'Лица, работающие с живыми культурами возбудителя сибирской язвы', NOW(),NOW()),
                                                                                  ('Против бешенства', 'EPIDEMIOLOGY', 48, 6240, 'Лица, работающие с живыми культурами возбудителя бешенства', NOW(),NOW()),
                                                                                  ('Против лептоспироза', 'EPIDEMIOLOGY', 336, 6240, 'Лица, работающие с живыми культурами возбудителя лептоспироза', NOW(),NOW()),
                                                                                  ('Против клещевого вирусного энцефалита', 'EPIDEMIOLOGY', 48, 6240, 'Лица, проживающие на эндемичных по клещевому вирусному энцефалиту территориях', NOW(),NOW()),
                                                                                  ('Против лихорадки Ку', 'EPIDEMIOLOGY', 48, 6240, 'Лица, работающие с живыми культурами возбудителя лихорадки Ку', NOW(),NOW()),
                                                                                  ('Против желтой лихорадки', 'EPIDEMIOLOGY', 48, 6240, 'Лица, выезжающие за пределы Российской Федерации в энзоотичные по желтой лихорадке страны', NOW(),NOW()),
                                                                                  ('Против холеры', 'EPIDEMIOLOGY', 48, 6240, 'Лица, выезжающие в неблагополучные по холере страны', NOW(),NOW()),
                                                                                  ('Против брюшного тифа', 'EPIDEMIOLOGY', 144, 6240, 'Лица, занятые в сфере коммунального благоустройства', NOW(),NOW()),
                                                                                  ('Против вирусного гепатита A', 'EPIDEMIOLOGY', 144, 6240, 'Лица, проживающие в регионах, неблагополучных по заболеваемости вирусным гепатитом A', NOW(),NOW()),
                                                                                  ('Против шигеллезов', 'EPIDEMIOLOGY', 48, 6240, 'Работники медицинских организаций инфекционного профиля', NOW(),NOW()),
                                                                                  ('Против менингококковой инфекции', 'EPIDEMIOLOGY', 48, 6240, 'Дети и взрослые в очагах менингококковой инфекции', NOW(),NOW()),
                                                                                  ('Против кори', 'EPIDEMIOLOGY', 48, 6240, 'Контактные лица без ограничения возраста из очагов заболевания', NOW(),NOW()),
                                                                                  ('Против вирусного гепатита B', 'EPIDEMIOLOGY', 0, 6240, 'Контактные лица из очагов заболевания, не болевшие, не привитые', NOW(),NOW()),
                                                                                  ('Против дифтерии', 'EPIDEMIOLOGY', 48, 6240, 'Контактные лица из очагов заболевания, не болевшие, не привитые', NOW(),NOW()),
                                                                                  ('Против эпидемического паротита', 'EPIDEMIOLOGY', 48, 6240, 'Контактные лица из очагов заболевания, ранее не болевшие, не привитые', NOW(),NOW()),
                                                                                  ('Против полиомиелита', 'EPIDEMIOLOGY', 0, 6240, 'Контактные лица в очагах полиомиелита, в том числе вызванного диким полиовирусом', NOW(),NOW()),
                                                                                  ('Против пневмококковой инфекции', 'EPIDEMIOLOGY', 24, 6240, 'Дети в возрасте от 2 до 5 лет, взрослые, относящиеся к группам риска', NOW(),NOW()),
                                                                                  ('Против ротавирусной инфекции', 'EPIDEMIOLOGY', 2, 8, 'Дети для активной вакцинации с целью профилактики заболеваний, вызываемых ротавирусами', NOW(),NOW()),
                                                                                  ('Против ветряной оспы', 'EPIDEMIOLOGY', 36, 6240, 'Дети и взрослые из групп риска, включая лиц, подлежащих призыву на военную службу', NOW(),NOW()),
                                                                                  ('Против гемофильной инфекции', 'EPIDEMIOLOGY', 48, 48, 'Дети, не привитые на первом году жизни против гемофильной инфекции', NOW(),NOW()),
                                                                                  ('Против коронавирусной инфекции, вызываемой вирусом SARS-CoV-2', 'EPIDEMIOLOGY', 144, 6240, 'Лица в возрасте 12 лет и старше', NOW(),NOW());

