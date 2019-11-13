// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

firebase.initializeApp({
  apiKey: "AIzaSyD3jewQCobjtV6BwUvz7mycmd9xU8FFfWM",
  authDomain: "angulartest-70bea.firebaseapp.com",
  databaseURL: "https://angulartest-70bea.firebaseio.com",
  projectId: "angulartest-70bea",
  storageBucket: "angulartest-70bea.appspot.com",
  messagingSenderId: "831333357024",
  appId: "1:831333357024:web:f94a2da2d6df7df7"
});

attachCustomCommands({ Cypress, cy, firebase })