const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Endpointy dla tabeli `users`

// Dodawanie nowego użytkownika
app.post('/users', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Błąd przy tworzeniu użytkownika:', error);
    res.status(500).json({ error: 'Nie udało się utworzyć użytkownika' });
  }
});

// Pobieranie wszystkich użytkowników
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników:', error);
    res.status(500).json({ error: 'Nie udało się pobrać użytkowników' });
  }
});

// Pobieranie użytkownika po ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony' });
    }
    res.json(user);
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkownika:', error);
    res.status(500).json({ error: 'Nie udało się pobrać użytkownika' });
  }
});

// Aktualizacja użytkownika
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const updatedData = { username, email, role };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updatedData,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Błąd przy aktualizacji użytkownika:', error);
    res.status(500).json({ error: 'Nie udało się zaktualizować użytkownika' });
  }
});

// Usuwanie użytkownika
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Błąd przy usuwaniu użytkownika:', error);
    res.status(500).json({ error: 'Nie udało się usunąć użytkownika' });
  }
});

//logowanie
app.get('/login', async (req, res) => {
  const { username } = req.body;

  try {
    const currentUser = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!currentUser) {
      return res.status(404).json({ error: 'Nie znaleziono użytkownika o podanym username' });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników:', error);
    res.status(500).json({ error: 'Nie udało się pobrać użytkowników' });
  }
});


// Endpointy dla tabeli `polls`

// Tworzenie ankiety
app.post('/polls', async (req, res) => {
  const { title, description, scale, opensAt, expiresAt } = req.body;
  try {
    const newPoll = await prisma.poll.create({
      data: {
        title,
        description,
        scale,
        opensAt: new Date(opensAt),  
        expiresAt: new Date(expiresAt),
      }
    });
    res.status(201).json(newPoll);
  } catch (error) {
    console.error('Błąd przy tworzeniu ankiety:', error);
    res.status(500).json({ error: 'Nie udało się utworzyć ankiety' });
  }
});


// Pobieranie wszystkich ankiet
app.get('/polls', async (req, res) => {
  try {
    const polls = await prisma.poll.findMany();
    res.json(polls);
  } catch (error) {
    console.error('Błąd przy pobieraniu ankiet:', error);
    res.status(500).json({ error: 'Nie udało się pobrać ankiet' });
  }
});

// Pobieranie aktywnych ankiet
app.get('/polls/active', async (req, res) => {
  try {
    const now = new Date();
    const activePolls = await prisma.poll.findMany({
      where: {
        opensAt: { lte: now },  
        expiresAt: { gte: now }, 
      },
    });
    res.json(activePolls);
  } catch (error) {
    console.error('Błąd przy pobieraniu aktywnych ankiet:', error);
    res.status(500).json({ error: 'Nie udało się pobrać aktywnych ankiet' });
  }
});


// Pobieranie ankiety po ID
app.get('/polls/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const poll = await prisma.poll.findUnique({
      where: { id: Number(id) },
    });
    if (!poll) {
      return res.status(404).json({ error: 'Ankieta nie znaleziony' });
    }
    res.json(poll);
  } catch (error) {
    console.error('Błąd przy pobieraniu ankiety:', error);
    res.status(500).json({ error: 'Nie udało się pobrać ankiety' });
  }
});

// Aktualizacja ankiety
app.put('/polls/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, scale, opens_at, expires_at } = req.body;
  try {
    const updatedPoll = await prisma.poll.update({
      where: { id: Number(id) },
      data: { title, description, scale, opens_at, expires_at },
    });
    res.json(updatedPoll);
  } catch (error) {
    console.error('Błąd przy aktualizacji ankiety:', error);
    res.status(500).json({ error: 'Nie udało się zaktualizować ankiety' });
  }
});

// Usuwanie ankiety
app.delete('/polls/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.poll.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Błąd przy usuwaniu ankiety:', error);
    res.status(500).json({ error: 'Nie udało się usunąć ankiety' });
  }
});

// Endpointy dla tabeli `votes`

// Dodawanie głosu do ankiety
app.post('/votes', async (req, res) => {
  const { pollId, userId, voteValue } = req.body; // Upewnij się, że dodajesz userId i voteValue
  const votedAt = new Date();
  
  try {
    const newVote = await prisma.vote.create({
      data: {
        pollId: pollId,  
        userId: userId,   
        voteValue: voteValue, 
        votedAt: votedAt   
      },
    });
    res.status(201).json(newVote);
  } catch (error) {
    console.error('Błąd przy dodawaniu głosu:', error);
    res.status(500).json({ error: 'Nie udało się dodać głosu' });
  }
});

// Pobieranie wszystkich głosów
app.get('/votes', async (req, res) => {
  try {
    const votes = await prisma.vote.findMany();
    res.json(votes);
  } catch (error) {
    console.error('Błąd przy pobieraniu głosów:', error);
    res.status(500).json({ error: 'Nie udało się pobrać głosów' });
  }
});

// Pobieranie głosów dla konkretnej ankiety
app.get('/votes/:poll_id', async (req, res) => {
  const { poll_id } = req.params;
  try {
    const votes = await prisma.vote.findMany({
      where: { pollId: Number(poll_id) }, 
    });
    res.json(votes);
  } catch (error) {
    console.error('Błąd przy pobieraniu głosów:', error);
    res.status(500).json({ error: 'Nie udało się pobrać głosów' });
  }
});


// Endpointy dla tabeli `results`

// Pobieranie wszystkich wyników
app.get('/results', async (req, res) => {
  try {
    const results = await prisma.result.findMany();
    res.json(results);
  } catch (error) {
    console.error('Błąd przy pobieraniu wyników:', error);
    res.status(500).json({ error: 'Nie udało się pobrać wyników' });
  }
});

// Pobieranie wyników dla konkretnej ankiety
app.get('/results/:poll_id', async (req, res) => {
  const { poll_id } = req.params;
  try {
    const result = await prisma.result.findUnique({
      where: { poll_id: Number(poll_id) },
    });
    if (!result) {
      return res.status(404).json({ error: 'Wynik nie znaleziony' });
    }
    res.json(result);
  } catch (error) {
    console.error('Błąd przy pobieraniu wyników ankiety:', error);
    res.status(500).json({ error: 'Nie udało się pobrać wyników ankiety' });
  }
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
