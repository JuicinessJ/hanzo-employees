INSERT INTO department (name)
VALUES  ("Legal"),
        ("Sales"),
        ("Marketing"),
        ("IT");

INSERT INTO role (title, salary, department_id)
VALUES  ("Chief Legal Officer", 250000, 1),
        ("Legal Manager", 100000, 1),
        ("Legal Clerk", 75000, 1),
        ("Chief Revenue Officer", 250000, 2),
        ("General Manager", 100000, 2),
        ("Sales Associate", 50000, 2),
        ("Chief Marketing Officer", 250000, 3),
        ("Marketing Manager", 100000, 3),
        ("Markerting Intern", 50000, 3),
        ("Chief Technology Officer", 250000, 4),
        ("System Manager", 100000, 4),
        ("System Administrator", 80000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Thomas", "Ballard", 1, null),
        ("Richard", "Marrero", 2, 1),
        ("Peter", "Blake", 3, 2),
        ("Beth", "Chi", 4, null),
        ("Mark", "Eckhoff", 5, 4),
        ("Shakira", "Herron", 6, 5),
        ("Bryan", "Cripe", 7, null),
        ("Alonzo", "Nixon", 8, 7),
        ("Edgar", "Dolin", 9, 8),
        ("Betty", "Miller", 10, null),
        ("William", "Switzer", 11, 10),
        ("Robert", "Poe", 12, 11);