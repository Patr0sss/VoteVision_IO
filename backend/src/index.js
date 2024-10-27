const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

// Middleware do parsowania JSON
app.use(bodyParser.json());

// Endpoint do dodawania nowego użytkownika
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

// Endpoint do pobierania wszystkich użytkowników
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Błąd przy pobieraniu użytkowników:', error);
    res.status(500).json({ error: 'Nie udało się pobrać użytkowników' });
  }
});

// Endpoint do pobierania użytkownika po ID
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

// Endpoint do aktualizacji użytkownika
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const updatedData = {
      username,
      email,
      role,
    };
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

// Endpoint do usuwania użytkownika
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

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
