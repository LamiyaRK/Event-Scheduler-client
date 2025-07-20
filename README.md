# 🗓️ Mini Event Scheduler with AI Categorization

This is a full-stack event scheduling application that allows users to **create**, **view**, **delete**, and **archive** events like meetings or reminders. It features a simple AI-like system to automatically categorize events into **Work**, **Personal**, or **Other** based on keywords.

---

## ✨ Features

### ✅ Frontend (React + TypeScript + Tailwind CSS)
- Create, view, delete, and archive events.
- Responsive UI with Tailwind CSS.
- Auto-categorized events are displayed based on title/notes.
- Sort events by date and time.
- Notes field for each event.
- Display-only category tag for each event.
-  Filter by category.
-  Error messages for failed API calls.

### ✅ Backend (Node.js + Express + TypeScript)
- RESTful APIs to manage events.
- In-memory storage (no database needed).
- AI-like categorization using keyword matching.
- Input validation (required fields, valid date/time).
- Proper HTTP status codes and error handling.
-  Unit test for categorization logic using Jest.

---

## 🚀 Getting Started

🛠️ Cloning and Running the Project Locally
If you want to use or modify this project, follow the steps below:

📂 Step 1: Clone the Repositories
# Clone the client repo
git clone https://github.com/LamiyaRK/Event-Scheduler-client.git

# Clone the server repo
git clone https://github.com/LamiyaRK/Event-Scheduler-server.git
▶️ Step 2: Start the Backend Server
cd Event-Scheduler-server
npm install
npm run dev


💻 Step 3: Start the Frontend Client
In a separate terminal:
cd Event-Scheduler-client
npm install
npm run dev

🌐 API Endpoints
POST /events
Create a new event.

Fields: title, date, time, notes 

Automatically categorized and archived: false by default.

GET /events
Retrieve all events.

Sorted by date and time (ascending).

PUT /events/:id
Archive an event (archived: true).

DELETE /events/:id
Delete an event.

🧠 AI-like Categorization
Keyword Matching Logic (used in POST /events)
Categorizes based on keywords in the title or notes:

Category	Keywords
Work	meeting, project, client, report, deadline
Personal	birthday, family, dinner, vacation, party
Other	Anything not matching above

Example: "Client meeting" → Work | "Dad's birthday" → Personal | "Random thing" → Other

🧪  Unit Testing
To run unit tests for the categorization logic:
cd server
npm run test
