CREATE TABLE categoria (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL
)

CREATE TABLE produto (
	id SERIAL PRIMARY KEY,
	categoria_id INTEGER NOT NULL,
	nome VARCHAR(255) NOT NULL,
	descricao TEXT,
	preco DECIMAL(10,2) NOT NULL,
	url_imagem VARCHAR(255) NOT NULL,
	ativo BOOLEAN DEFAULT true,

	FOREIGN KEY (categoria_id) REFERENCES categoria (id)
)
