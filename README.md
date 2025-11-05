<p align="center">
  <img src="frontend/public/icon.svg" alt="Craft Your List Icon" width="120" />
</p>

<h1 align="center">Craft Your List</h1>

<p align="center">
  🧩 Automatically fill Pokémon and Yu-Gi-Oh! decklist PDFs from text or clipboard.
</p>

---

## 🧠 Overview

**Craft Your List** is a web application that lets you **generate and auto-fill official tournament decklist PDFs** for:

- 🟦 **Pokémon TCG**
- 🔴 **Yu-Gi-Oh! TCG**

Paste your decklist text, and the app will parse, structure, and fill the official PDF forms automatically — saving you time when registering decks for tournaments.

---

## ⚙️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Backend** | [NestJS](https://nestjs.com/) |
| **Frontend** | [React](https://react.dev/) |
| **PDF Engine** | [pdf-lib](https://pdf-lib.js.org/) |
| **Validation** | class-validator / class-transformer |
| **Language** | TypeScript |

---

## 🧩 Features

- 🪄 **Automatic parsing** of decklists from text or clipboard
- 🧾 **PDF Autofill** for Pokémon and Yu-Gi-Oh! official forms
- 🧠 Smart mapping of card sections and totals
- 👤 **User-based autofill** for player data (Name, ID, Birthdate, Division, etc.)
- 🧱 Modular architecture — easily extendable for more TCGs (e.g., MTG)



