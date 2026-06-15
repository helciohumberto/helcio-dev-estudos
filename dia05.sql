CREATE TABLE animais (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	raca VARCHAR(100),
	peso NUMERIC(10, 2),
	data_nascimento DATE
)

CREATE TABLE racoes (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	preco_kg NUMERIC(10, 2)
)

CREATE TABLE animais_racoes (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animais(id),
    racao_id INTEGER REFERENCES racoes(id),
    quantidade_kg NUMERIC(10,2)
)

INSERT INTO animais (nome, raca, peso, data_nascimento) VALUES ('VACA', 'NELORE', 350, '2020-01-02');
INSERT INTO animais (nome, raca, peso, data_nascimento) VALUES ('VACA', 'ANGUS', 300, '2024-08-05');
INSERT INTO animais (nome, raca, peso, data_nascimento) VALUES ('BOI', 'NELORE', 450, '2020-06-01');

INSERT INTO racoes (nome, preco_kg) VALUES ('Ração Premium', 2.50);
INSERT INTO racoes (nome, preco_kg) VALUES ('Ração Standard', 1.80);
INSERT INTO racoes (nome, preco_kg) VALUES ('Ração Econômica', 1.20);

INSERT INTO animais_racoes (animal_id, racao_id, quantidade_kg) VALUES (1, 1, 5.0);
INSERT INTO animais_racoes (animal_id, racao_id, quantidade_kg) VALUES (2, 2, 3.5);
INSERT INTO animais_racoes (animal_id, racao_id, quantidade_kg) VALUES (3, 1, 6.0);

SELECT * FROM animais
SELECT * FROM animais_racoes

SELECT * FROM animais WHERE raca LIKE 'NELORE%'
SELECT AVG(peso) FROM animais

SELECT raca, COUNT(*) FROM animais GROUP BY raca

SELECT raca, COUNT(*) FROM animais GROUP BY raca HAVING COUNT(*) > 1


