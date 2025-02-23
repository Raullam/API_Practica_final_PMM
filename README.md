# Desenvolupament d'una API RESTful per a la Gestió d'una Aplicació de Plantes 🌱

## C.F.G.S DAM CIFP PAU CASESNOVES 🎓

**Realització API RESTful - Programació multimèdia i dispositius mòbils 💻📱**

**Curs:** 2n C.F.G. 📅  
**Data:** 21/02/2025 📅  
**Alumne:** Raül Lama Martorell 👨‍🎓  

---

## Índex 📑

1. [Memòria Tècnica](#memòria-tècnica) 📝
   - [Resum/Objectius](#resumobjectius) 🎯
2. [Introducció](#introducció) 📖
3. [Objectius](#objectius) 🎯
   - [Objectiu General](#objectiu-general) 🎯
   - [Objectius Específics](#objectius-específics) 🎯
4. [Metodologia](#metodologia) ⚙️
5. [Descripció Tècnica](#descripció-tècnica) 🛠️
   - [Tecnologies Utilitzades](#tecnologies-utilitzades) 🛠️
   - [Estructura del Projecte](#estructura-del-projecte) 🗂️
   - [Arquitectura de l'API](#arquitectura-de-lapi) 🏗️
   - [Base de Dades](#base-de-dades) 💾
   - [Documentació amb Swagger](#documentació-amb-swagger) 📜
6. [Instal·lació i Configuració](#instal·lació-i-configuració) ⚙️
   - [Requisits previs](#requisits-previs) 📋
   - [Instal·lació de dependències](#instal·lació-de-dependències) 📦
   - [Configuració de variables d'entorn](#configuració-de-variables-dentorn) ⚙️
7. [Resultats](#resultats) ✅
8. [Conclusions](#conclusions) 📝
9. [Treball Futur](#treball-futur) 🔮
10. [Agraïments](#agraïments) 🙏
11. [Annexos](#annexos) 📎

---

## Memòria Tècnica 📝

### Resum/Objectius 🎯
Aquest treball presenta el disseny, la implementació i la documentació d'una API RESTful desenvolupada amb Node.js i Express per a la gestió d'una aplicació de plantes tipus joc. L'API permet l'administració d'usuaris, plantes i ítems. 

L'api esta documentada mitjançant Swagger, accessible a l'enllaç:  

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)


Es planteja continuar aquest projecte per al treball final, integrant-lo amb serveis al núvol i implementant autenticació per mitjà de tokens.

## Introducció 📖

Les aplicacions modernes necessiten APIs robustes i ben documentades per facilitar la interacció entre el frontend i el backend. Aquest projecte proposa el desenvolupament d'una API RESTful per a la gestió d'un joc de plantes, amb atributs com atac, defensa i nivell, així com la compra d'ítems amb BTC.

Aquest projecte explora el desenvolupament de serveis web escalables amb Node.js, Express, MySQL i Swagger.

## Objectius 🎯

### Objectiu General 🎯
Dissenyar i implementar una API RESTful funcional, modular i documentada per gestionar usuaris, plantes i ítems, garantint escalabilitat i mantenibilitat.

### Objectius Específics 🎯

- Implementar un sistema de rutes modular.
- Integrar una base de dades MySQL.
- Configurar Swagger per a la documentació.
- Garantir seguretat mitjançant variables d'entorn.
- Provar el funcionament mitjançant Postman i altres eines.

## Metodologia ⚙️

- **Anàlisi de Requisits:** Identificació d'entitats i operacions CRUD.
- **Disseny:** Arquitectura modular amb separació de responsabilitats.
- **Implementació:** Desenvolupament amb Node.js i Express.
- **Documentació:** Integració de Swagger.
- **Proves:** Verificació d'endpoints amb Postman.

## Descripció Tècnica 🛠️

### Tecnologies Utilitzades 🛠️

- **Node.js**: Entorn d'execució per JavaScript.
- **Express**: Framework per a API RESTful.
- **MySQL**: Base de dades relacional.
- **Swagger**: Generació automàtica de documentació.
- **dotenv**: Gestió de variables d'entorn.
- **CORS i Body-parser**: Middlewares per gestionar sol·licituds.

### Estructura del Projecte 🗂️

```bash
📂 api-plantes
├── index2.js
├── config/
│   ├── db.js
├── routes/
│   ├── usuaris.js
│   ├── plantes.js
│   ├── items.js
├── swagger.js
├── .env
```

### Arquitectura de l'API

#### Usuaris (`/usuaris`)
- `GET /usuaris` - Llista tots els usuaris.
- `POST /usuaris` - Crea un nou usuari.
- `PUT /usuaris/:id` - Actualitza un usuari.
- `DELETE /usuaris/:id` - Elimina un usuari.

#### Plantes (`/plantas`)
- `GET /plantas` - Llista totes les plantes.
- `POST /plantas` - Crea una nova planta.

#### Ítems (`/items`)
- `GET /items` - Llista tots els ítems.
- `POST /items/items_usuaris` - Compra d'ítems.

### Base de Dades

La base de dades `appplantes2` conté les següents taules:

- **usuaris** (id, nom, correu, contrasenya, btc...)
- **plantas** (id, usuari_id, nom, nivell...)
- **items** (id, nom, preu...)
- **items_usuaris** (usuari_id, item_id, quantitat)

### Documentació amb Swagger

La documentació es genera automàticament a [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).

## Instal·lació i Configuració

### Requisits previs

- **Node.js i npm** instal·lats.
- **Base de dades MySQL** configurada.

### Instal·lació de dependències

```bash
npm install
```

### Configuració de variables d'entorn

```bash
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
PORT=3000
```

## Resultats

- **Implementació exitosa**: L'API funciona localment a `http://localhost:3000`.
- **Modularitat**: Codi organitzat en rutes i arxius separats.
- **Documentació clara**: Generada amb Swagger.

## Conclusions

El projecte demostra la viabilitat de Node.js i Express per a APIs RESTful. L'arquitectura modular permet expansió futura.

## Treball Futur

- Autenticació amb JWT.
- Validacions més estrictes.
- Desplegament a AWS o Heroku.
- Desenvolupament d'un frontend.

## Agraïments

Agraïments a [nom del tutor] pel suport i a la comunitat de codi obert.

## Annexos

Codi font: [GitHub](https://github.com/Raullam/API_Practica_final_PMM)
