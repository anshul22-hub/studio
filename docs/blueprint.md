# **App Name**: DataPump

## Core Features:

- Source Selection: Enable users to select either ClickHouse or Flat File as the data source.
- Connection Configuration: Provide UI elements for users to input connection parameters for both ClickHouse (Host, Port, Database, User, JWT Token) and Flat File (file path, delimiter).
- Schema Discovery & Column Selection: Fetch and display available tables from ClickHouse or infer the schema from the Flat File; allow users to select specific columns for data ingestion using checkboxes.
- Data Ingestion: Transfer data between the selected source and destination based on user configurations, efficiently handling data using batching or streaming.
- Completion Reporting: Display the total count of ingested records upon successful completion of the data transfer process.

## Style Guidelines:

- Primary color: Use a calm blue (#4285F4) for the header and primary interactive elements.
- Secondary color: Light gray (#F0F0F0) for backgrounds and card containers to provide visual separation.
- Accent: Green (#34A853) to highlight success messages and completion states.
- Use clear and readable typography with appropriate contrast.
- Employ simple, intuitive icons for actions such as 'Connect', 'Load', and 'Ingest'.
- Organize the UI into logical sections: Source Configuration, Column Selection, and Status Display.

## Original User Request:
Integration Assignment: Bidirectional ClickHouse & Flat File Data
Ingestion Tool
1. Objective:
Develop a web-based application with a simple user interface (UI) that facilitates data
ingestion between a ClickHouse database and the Flat File pla

orm. The application

must support bidirectional data

ow (ClickHouse to Flat File and Flat File to
ClickHouse), handle JWT token-based authentication for ClickHouse as a source,
allow users to select speci

c columns for ingestion, and report the total number of

records processed upon completion.
2. Core Requirements:
● Application Type: Web application (backend logic + frontend UI).
● Bidirectional Flow: Implement both:
○ ClickHouse -> Flat File ingestion.
○ Flat File -> Clickhouse ingestion.
● Source Selection: UI must allow users to choose the data source ("ClickHouse"
or "Flat File").
● ClickHouse Connection (as Source):
○ UI Con

guration: Inputs for Host, Port (e.g., 9440/8443 for h

ps, 9000/8123

for h
p), Database, User, and JWT Token.

○ Authentication: Use the provided JWT token via a compatible ClickHouse
client library.
○ Client Library: Use a client from the o

cial list:

h
ps://github.com/ClickHouse (Use any language of your choice - Golang,
Python, Java).
● Flat File Integration:
○ UI Con

guration : Local Flat File name, Delimiters

○ Client Library - Use any IO library.
● Schema Discovery & Column Selection:
○ Connect to the source and fetch the list of available tables (ClickHouse) or the
schema of the Flat File data.
○ Display column names in the UI with selection controls (e.g., checkboxes).
● Ingestion Process:
○ Execute data transfer based on user selections.
○ Implement e

cient data handling (batching/streaming recommended).
● Completion Reporting: Display the total count of ingested records upon
success.

● Error Handling: Implement basic error handling (connection, auth, query,
ingestion) and display user-friendly messages.
3. User Interface (UI) Requirements:
● Clear source/target selection.
● Input

elds for all necessary connection parameters (ClickHouse source/target,
Flat File).
● Mechanism to list tables (ClickHouse) or identify Flat File data source.
● Column list display with selection controls.
● Action bu

ons (e.g., "Connect", "Load Columns", "Preview", "Start Ingestion").
● Status display area (Connecting, Fetching, Ingesting, Completed, Error).
● Result display area (record count or error message).
4. Bonus Requirements:
● Multi-Table Join (ClickHouse Source):
○ Allow selection of multiple ClickHouse tables.
○ UI element to input JOIN key(s)/conditions.
○ Backend logic to construct and execute the JOIN query for ingestion.
5. Optional Features (Enhancements):
● Progress Bar: Visual indicator of ingestion progress (can be approximate).
● Data Preview: Bu

on to display the

rst 100 records of the selected source data

(with selected columns) in the UI before full ingestion.
6. Technical Considerations:
● Backend: Go or Java preferable. But any language accepted.
● Frontend: Simple HTML/CSS/JS, React, Vue, Angular, or server-side templates.
● ClickHouse Instance: Local (Docker) or cloud-based. Load example datasets for
testing.
● JWT Handling: Use libraries to manage JWTs if needed, primarily pass the token
to the ClickHouse client.
● Data Type Mapping: Consider potential type mismatches between ClickHouse
and Flat File/CSV.
7. Testing Requirements:
● Datasets: Use ClickHouse example datasets like uk_price_paid and ontime
(h
ps://clickhouse.com/docs/ge

ing-started/example-datasets).

● Test Cases:
1. Single ClickHouse table -> Flat File (selected columns). Verify count.
2. Flat File (CSV upload) -> New ClickHouse table (selected columns). Verify

count & data.
3. (Bonus) Joined ClickHouse tables -> Flat File. Verify count.
4. Test connection/authentication failures.
5. (Optional) Test data preview.

8. AI Tools Usage:
● We strongly encourage taking AI coding assistance using any tool of your
choice
● Record the prompts you are using in these tools.
9. Deliverables:
● Source code - Git repository check in is a must-have. Else wont be evaluated.
● README.md with setup, con

guration, and run instructions.
can you help me to do this project
  