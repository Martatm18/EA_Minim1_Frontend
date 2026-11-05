#Registre d'ús d'Intel·ligència Artificial

### Consulta 1: Disseny de les vistes HTML i estils en tons taronges
- **Pregunta:** Com estructurar les plantilles HTML (llistat i detall) i dissenyar els fitxers de fulls d'estil en cascada (`.css`) utilitzant una gamma de tons taronges corporatius.
- **Prompt:** "Ajuda'm a dissenyar els fitxers HTML i CSS per als components d'auditoria d'Angular, aplicant una paleta de colors basada en tons taronges i àmbar, amb taules responsives i targetes ben estructurades."
- **Incoherències:** Alguns estils utilitzaven classes genèriques d'altres llibreries externes que no fem servir al projecte (com Bootstrap).
- **Solució:** S'ha adaptat el codi HTML i CSS pur per fer servir la nova sintaxi de flux de control d'Angular (`@if`, `@for`) i estils CSS propis adaptats a l'arquitectura del projecte.

### Consulta 2: Resolució de tipats estrictes i paginació al Frontend
- **Pregunta:** Com resoldre els errors de tipat amb ESLint (`no-explicit-any`) i corregir la paginació perquè no mostri "Pàgina 1 de 0" quan no hi ha registres.
- **Prompt:** "Com puc evitar l'error de l'ESLint en accedir al servei d'autenticació i com assegurar que el total de pàgines mai sigui 0 al client?"
- **Incoherències:** Proposava canvis a la lògica global de models del backend.
- **Solució:** S'ha aplicat un càsting segur amb `unknown` al servei d'autenticació i s'ha utilitzat `Math.max(1, response.totalPages)` direktament al component per garantir una visualització neta.