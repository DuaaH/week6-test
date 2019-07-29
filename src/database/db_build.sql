BEGIN ;
DROP TABLE IF EXISTS cities CASCADE;


CREATE TABLE cities(
  id SERIAL PRIMARY KEY ,
  city_name VARCHAR (255) NOT NULL,
  country_name VARCHAR (255) NOT NULL
);

INSERT INTO cities (city_name,country_name) VALUES ('Madrid','Spain'),('Hebron','Palestine');


COMMIT;
