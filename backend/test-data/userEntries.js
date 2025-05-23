/*
    @File: userEntries.js
    @Project: FitGlitch
    @Author: John Miller
    @Date: 2025-05
    @Description: This file contains test data for user entries in the FitGlitch application.
    @Notes: Used for PostMan testing and initial database seeding.
*/

[
  {
    "email": "alice@example.com",
    "password": "password123",
    "goalWeight": 150,
    "caloricGoal": 1800,
    "loseWeight": true
  },
  {
    "email": "bob@example.com",
    "password": "securePass!45",
    "goalWeight": 185,
    "caloricGoal": 2500,
    "loseWeight": false
  },
  // Password is intentionally weak for testing
  {
    "email": "charlie@example.com",
    "password": "mwe23",
    "goalWeight": 170,
    "caloricGoal": 2100,
    "loseWeight": true
  },
  // Testing negative goalWeight
  {
    "email": "danielle@example.com",
    "password": "daniRules89",
    "goalWeight": -135,
    "caloricGoal": 1600,
    "loseWeight": true
  },
  // Testing negative caloricGoal
  {
    "email": "edward@example.com",
    "password": "ed_pass456",
    "goalWeight": 200,
    "caloricGoal": -2800,
    "loseWeight": false
  },
  // Testing Missing fields
  {
    "email": "",
    "password": "",
    "goalWeight": 1,
    "caloricGoal": 1,
    "loseWeight": false
  }
]