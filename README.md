DAYSTRIDE ISTRUZIONI PER USO E INSTALLAZIONE

Daystride è una webapp che permette di tracciare la propria attività giornaliera e il proprio umore.
Daystride si compone di:

-   Frontend sviluppato in REACT, contenuto nella cartella "./clientapp/"
-   Backend sviluppato in .net CORE come webapi, contenuto nella cartella "./API/"
-   Database SQL Server

Per poter avviare la app sulla propria macchina, vanno seguiti i seguenti passaggi.

1. SCARICARE LA APP

La app si può scaricare clonando la repository dove è caricata con il comando:

git clone https://github.com/matteofalco1986/Daystride.git

2. CREARE IL DATABASE

Il database sarà creato attraverso la quert contenuta nel file "DaystrideDbInitializationQuery.sql"

-   Aprire il file "DaystrideDbInitializationQuery.sql" presente nella root del progetto.
-   Eseguire la query.

In caso di errore, è probabile che la path per la creazione del database a riga 7 e 9 della query non corrisponda con quella dell'engine di SQL Server installato. In caso di errore, provare a rimpiazzare la path nella query con quella del sistema installato correntemente. Il nome del Db e del log vanno mantenuti a "DayStride.mdf" e "DayStride_log.ldf"

3. RIMPIAZZARE LA STRINGA DI CONNESSIONE

Rimpiazzare la connectionstring nei files:

-   /API/appsettings.json - Line 10
-   /API/Data/DayStrideContext.cs - Line 47

La app si interfacca al Database tramite SQL Server Authentication, essendo stata sviluppata su MacOS con SQL Server in Docker. Se si vuole mantenere la procedura di connessione, è sufficiente aggiornare l'IP del server con l'IP della propria macchina.
In caso si voglia utilizzare l'opzione "Windows Authentication" (preferibile per lo sviluppo in locale su PC), la connection string va rimpiazzata con la seguente:

"Server=localhost;Database=DayStride;Encrypt=True;Trusted_Connection=True;TrustServerCertificate=True;"

4. INSTALLARE I PACCHETTI PER IL LATO CLIENT

-   Assicurarsi che NodeJs sia installato sulla macchina
-   Da terminale, navigare dentro la cartella "./clientapp/"
-   Eseguire il seguente comando:
    -   npm install @fullcalendar/bootstrap5 @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @reduxjs/toolkit axios bootstrap bootstrap-icons date-fns react-bootstrap react-bootstrap-icons react-icons react-redux react-router-dom





UNA VOLTA AVVIATA LA APP

La maggiorparte delle funzionalità della app sono accessibili solo previo login e/o registrazione. L'autenticazione viene gestita tramite generazione di un token JWT da parte del server. Di default, il token viene salvato nel localstorage del browser, da cui la parte frontend della app lo legge. Il server verifica la presenza del token nell'header delle request del client e lo valida, autorizzando l'accesso alle pagine.

La registrazione è gestita tramite le proprietà che la classe IdentityUser di .net Core mette a disposizione, il che significa che le password sono "hashed" e quindi non riconoscibili guardando nel Database.

Username e password validi per il login sono:

-   Username: admin
-   Password: Pa$$w0rd


La sezione INSPIRE ME

La sezione Inspire me include citazioni e sfondi rilassanti. La app si appoggia a due api esterne per dati riguardanti citazioni e immagini.

La API per le immagini è Pexels (vedi https://www.pexels.com/api/)

L'autenticazione prevede un token da includere nell'header della request. In caso di token scaduto o non funzionante, andare su https://www.pexels.com/api/new/ per avere un nuovo token e usarlo per rimpiazzare quello salvato nella costante PexelsToken in /clientapp/src/data/data.js.


AVVIARE LA APP VIA TERMINALE

Avviare il server

-   Navigare alla cartella /Daystride/API/
-   Digitare "dotnet run" o "dotnet watch --no-hot-reload"

Avviare il client

-   Navigare alla cartella /Daystride/clientapp/
-   Digitare "npm start"

