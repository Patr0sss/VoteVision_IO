# Dokumentacja inżynierii wymagań

## Członkowie zespołu

- [Miyagi](https://github.com/Patr0sss)
- [Paweł](https://github.com/pawel-rus)
- [Karo(L)](https://github.com/kslowiak)
- [Piotr](https://github.com/ptrthecat)

## 1. Macierz kompetencji zespołu
| Kompetencje | Krystian | Paweł | Karol | Piotr |
| ----------- | -------- |----------|----------|-------|
| React TS | ✅ | ❌ | ❌ | ❌ |
| Bazy Danych| ❌ | ✅ | ❌ | ❌ |
| Backend| ✅ | ✅ | ❌ | ❌ |
| Testowanie| ❌ | ❌ | ❌ | ❌ |
| Project Management| ✅ | ❌ | ❌ | ❌ | 

## 2. Zestaw pytań 

| Pytanie | Odpowiedź | Uwagi |
|----------|----------|----------|
| Jaka ma to być aplikacja? Webowa czy Desktopowa? | Webowa | - |
| Jaka będzie liczba użytkowników? | <1k | - |
| Z logowaniem? | Tak | Login - hasło |
| Głosowanie jawne czy tajne? | Jawne | - |
| Czy ma być statystyka na żywo? | Tak | - |
| Jaka rola admina? | Tworzenie ankiet/głosowań. Dostęp do raportów | - |
| Hosting? | Lokalnie | - |
| Jaki interfejs użytkownika? | GUI | Funkcjonalny, przejrzysty, ładny |

## 3. Ustalony format danych wejściowych

### Struktura bazy danych:

### Tabela: `users`:

| Kolumna       | Typ danych     | Opis                                              |
| ------------- | -------------- | ------------------------------------------------- |
| `id`          | `INT`          | Unikalny identyfikator użytkownika (klucz główny) |
| `username`    | `VARCHAR(50)`  | Nazwa użytkownika                                 |
| `password`    | `VARCHAR(255)` | Hash hasła                                        |
| `email`       | `VARCHAR(100)` | Firmowy email użytkownika                         |
| `role`        | `VARCHAR(10)`  | Rola użytkownika (`admin` albo `user`)            |

### Tabela: `polls` :

| Kolumna        | Typ danych     | Opis                                               |
| -------------- | -------------- | -------------------------------------------------- |
| `id`           | `INT`          | Unikalny identyfikator ankiety (klucz główny)      |
| `title`        | `VARCHAR(255)` | Tytuł ankiety                                      |
| `description`  | `TEXT`         | Opis ankiety                                       |
| `scale`        | `varchar(50)`  | Skala ocen (np. 0-5, 1-5, 1-10)                    |
| `opens_at`     | `TIMESTAMP`    | Data i czas otwarcia ankiety                       |
| `expires_at`   | `TIMESTAMP`    | Data i czas zakończenia ankiety                    |

### Tabela: `votes` :

| Kolumna        | Typ danych     | Opis                                               |
| -------------- | -------------- | -------------------------------------------------- |
| `id`           | `INT`          | Unikalny identyfikator głosu (klucz główny)        |
| `poll_id`      | `INT`          | ID ankiety, na którą oddano głos (klucz obcy)      |
| `user_id`      | `INT`          | ID użytkownika, który oddał głos (klucz obcy)      |
| `vote_value`   | `INT`          | Wartość oddanego głosu w ustalonej skali           |
| `voted_at`     | `TIMESTAMP`    | Data i czas oddania głosu                          |

### Tabela: `results` :

| Kolumna        | Typ danych     | Opis                                               |
| -------------- | -------------- | -------------------------------------------------- |
| `poll_id`      | `INT`          | ID ankiety (klucz główny i obcy)                   |
| `average_vote` | `FLOAT`        | Średnia ocena oddana w ankiecie                    |
| `votes_count`  | `INT`          | Liczba głosów oddanych na dany projekt             |


### Przykład danych wejściowych

Poniżej przedstawiono przykłady danych zgodnych z ustaloną strukturą bazy danych.

#### Tabela: `users`

| id  | username   | password                           | email                | role  |
| --- | ---------- | ---------------------------------- | -------------------- | ----- |
| 1   | admin      | $2y$10$abcdefghijkmnopqrstuvwxyz   | admin@example.com    | admin |
| 2   | jsmith     | $2y$10$lmnopqrstuvwxyzabcdefghijk  | jsmith@example.com   | user  |
| 3   | amiller    | $2y$10$zxywvutsrqponmlkjihgfedcba  | amiller@example.com  | user  |

#### Tabela: `polls`

| id  | title                 | description                                      | scale | opens_at            | expires_at          |
| --- | --------------------- | ------------------------------------------------ | ----- | ------------------- | ------------------- |
| 1   | Project XYZ           | Ocena projektu według skali 1-5                  | 1-5   | 2024-10-01 09:00:00 | 2024-10-10 17:00:00 |
| 2   | Project ZYX           | Podsumowanie wyników sprintu według skali 0-5    | 0-5   | 2024-10-05 10:00:00 | 2024-10-15 18:00:00 |

#### Tabela: `votes`

| id  | poll_id | user_id | vote_value | voted_at             |
| --- | ------- | ------- | ---------- | -------------------- |
| 1   | 1       | 2       | 4          | 2024-10-02 09:15:00  |
| 2   | 1       | 3       | 5          | 2024-10-03 14:20:00  |
| 3   | 2       | 2       | 3          | 2024-10-06 11:30:00  |

#### Tabela: `results`

| poll_id | average_vote | votes_count |
| ------- | ------------ | ----------- |
| 1       | 4.5           | 2            |
| 2       | 3.0           | 1            |










```mermaid
graph LR
A[Login] --> B{Check Credentials}
B -- Valid --> C[Connect DB]
B -- Invalid --> E[Error Message]
C --> D((Authenticate))
D --> F{Voting}
F --> G[Vote Submitted]
F --> H[Vote Failed]
```


### 7. Stack technologiczny
 - React
 - Node.js
 - 



## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

```mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```
