how to :
Pobierz obraz PostgreSQL:

`docker pull postgres`

Uruchom kontener z PostgreSQL:

`docker run --name my_postgres -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=my_database -p 5432:5432 -d postgres`

Skopiuj plik db.sql do kontenera:

`docker cp db.sql my_postgres:/db.sql`

Wykonaj skrypt SQL w bazie danych:

`docker exec -it my_postgres psql -U postgres -d my_database -f /db.sql`

Zaloguj się do bazy danych:

`docker exec -it my_postgres psql -U postgres -d my_database`

Wyświetl tabele w bazie danych:

`\dt`

Zatrzymaj kontener:

`docker stop my_postgres`

Uruchom ponownie zatrzymany kontener:

`docker start my_postgres`

Usuń kontener:

`docker rm my_postgres`
