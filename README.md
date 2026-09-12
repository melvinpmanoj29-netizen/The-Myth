# THE MYTH — Resonance Network

> **THE ONE WHO LISTENS WHEN OTHERS DON'T.**

THE MYTH is an interactive superhero help portal built around one simple idea:

**Everyone has a story. Someone should listen.**

The website combines a cinematic superhero experience with an AI-powered conversational interface where visitors can introduce themselves, share what they are going through, and transmit a help request directly through the MYTH network.

---

## ✦ About THE MYTH

Before he became THE MYTH, he was an ordinary football player.

A serious injury changed his life and brought him into the care of a respected doctor. Unknown to the public, the doctor was secretly conducting dangerous human experiments in an underground laboratory.

The injured player became one of his subjects.

Experimental compounds and controlled radioactive exposure transformed his body, unlocking extraordinary physical abilities and awakening a mysterious energy known as **The Signal**.

The experiment was never supposed to create a hero.

But it did.

THE MYTH escaped the laboratory and disappeared from the world.

Years later, stories began appearing about a mysterious figure who could somehow hear the people nobody else noticed.

He became known as:

**THE MYTH.**

Not because he has every answer.

But because when someone reaches out, **he listens.**

---

## ⚡ Core Concept

THE MYTH is designed around five principles:

```text
LISTEN
   ↓
UNDERSTAND
   ↓
STAND
   ↓
PROTECT
   ↓
EMPOWER

The greatest ability of THE MYTH isn't strength or speed.

It is listening.

🚀 Features
AI-Powered Conversation

Visitors can have a natural conversation with THE MYTH through the interactive MYTH SIGNAL TERMINAL.

The chatbot:

Collects the visitor's name
Collects age
Collects location
Collects email
Moves into natural conversation
Understands the visitor's request
Maintains conversation context
Continues chatting after submission
📡 MYTH SIGNAL TERMINAL

The chatbot is presented as a futuristic communication terminal rather than a conventional AI chat window.

The interface includes:

MYTH identity panel
Signal status
Frequency indicator
Transmission status
Threat indicator
Signal strength
Secure communication styling
Real-time conversation interface
📩 Automatic Email Notifications

When a visitor transmits a request, the system sends:

Owner notification

The website owner receives:

Visitor name
Age
Location
Email
Grievance/request
Submission date and time

Visitor confirmation

The visitor receives a confirmation email acknowledging that their request has been received.

Email delivery is handled server-side using Gmail SMTP.

🔄 Post-Submission Conversation

Submitting a request does not end the conversation.

After transmission:

REQUEST TRANSMITTED
        ↓
EMAIL NOTIFICATIONS
        ↓
TRANSMISSION CONFIRMED
        ↓
CHAT REMAINS ACTIVE
        ↓
CONTINUE TALKING TO THE MYTH

Follow-up messages continue through the AI chatbot without triggering duplicate grievance emails.

🎨 Cinematic Interface

The website uses an original visual identity inspired by:

Anime futurism
Superhero interfaces
Dark cinematic environments
Tactical command centers
Sci-fi communication systems
Red/cyan energy aesthetics

Primary visual palette:

Color	Hex
Charcoal Black	#0B0B0D
Dark Surface	#151518
Crimson Red	#C1121F
Bright Red	#FF2635
Signal Cyan	#00E5FF
Bright Cyan	#36F5FF
White	#F2F2F2
Gray	#96969E
🛠️ Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Framer Motion
Lucide Icons
AI
Google Gemini API
Gemini 3.6 Flash
Email
Gmail SMTP
Nodemailer
Development
Node.js
npm
Git
GitHub
Deployment
Vercel
🏗️ Project Structure
The-MYTH/
│
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts
│   │   │
│   │   └── submit-request/
│   │       └── route.ts
│   │
│   ├── ...
│   └── page.tsx
│
├── components/
│   ├── ...
│   └── chatbot components
│
├── lib/
│   ├── gemini.ts
│   ├── email service
│   └── ...
│
├── public/
│   ├── images/
│   └── ...
│
├── types/
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── README.md
🔐 Environment Variables

Create a .env file locally.

GEMINI_API_KEY=your_gemini_api_key

GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=587
GMAIL_SMTP_USER=your_gmail@gmail.com
GMAIL_SMTP_PASSWORD=your_gmail_app_password

GMAIL_FROM_EMAIL=your_gmail@gmail.com
GMAIL_FROM_NAME=THE MYTH

MYTH_EMAIL_TO=your_owner_email@gmail.com
Security

Never commit .env to GitHub.

The following must remain private:

Gemini API key
Gmail App Password
SMTP credentials

The repository should only contain .env.example with placeholder values.

💻 Getting Started
1. Clone the repository
git clone https://github.com/melvinpmanoj29-netizen/The-MYTH.git
2. Enter the project
cd The-MYTH
3. Install dependencies
npm install
4. Configure environment variables

Create:

.env

and add the required credentials.

5. Start the development server
npm run dev
6. Open the website
http://localhost:3000
📡 Application Flow
                    ┌──────────────────┐
                    │      VISITOR     │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   THE MYTH PORTAL   │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   PROFILE DETAILS   │
                  │                     │
                  │ Name                │
                  │ Age                 │
                  │ Location            │
                  │ Email               │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ NATURAL CONVERSATION│
                  │      GEMINI AI      │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │  TRANSMIT REQUEST   │
                  └──────────┬──────────┘
                             │
                 ┌───────────┴───────────┐
                 ▼                       ▼
        ┌─────────────────┐     ┌─────────────────┐
        │   OWNER EMAIL   │     │ VISITOR EMAIL  │
        │                 │     │                 │
        │ Full request    │     │ Confirmation    │
        │ + visitor data  │     │ message        │
        └─────────────────┘     └─────────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ TRANSMISSION        │
                  │ CONFIRMED           │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ CONTINUE TALKING    │
                  │     WITH THE MYTH   │
                  └─────────────────────┘
🧠 AI Architecture

The Gemini API is accessed server-side.

The browser communicates with:

/api/chat

The server communicates with Gemini.

This keeps the Gemini API key away from the client.

Similarly, email transmission is handled server-side through:

/api/submit-request

The browser never receives the Gmail SMTP credentials.

📧 Email Architecture
Visitor
   │
   │ Submit Request
   ▼
/api/submit-request
   │
   ├───────────────► Gmail SMTP
   │                     │
   │                     ├──► Owner notification
   │                     │
   │                     └──► Visitor confirmation
   │
   ▼
Transmission confirmed

Normal follow-up conversations use:

/api/chat

and do not trigger another email submission.

🎯 Design Philosophy

THE MYTH isn't designed as a conventional chatbot.

The goal is to make the visitor feel like they have entered a fictional communication network.

The interface therefore uses:

Signal terminology
Transmission states
Frequency indicators
Secure connection indicators
Cinematic imagery
Futuristic terminal panels
Red/cyan energy accents

The technology stays in the background.

The conversation stays at the center.

🦸 THE MYTH
Identity

THE MYTH

Network

RESONANCE NETWORK

Motto

THE ONE WHO LISTENS WHEN OTHERS DON'T.

Directive
LISTEN
UNDERSTAND
STAND
PROTECT
EMPOWER
Mission

Give people a place to be heard, understood, and supported.

📋 Challenge

This project was developed as part of the TECHASCENT / WHITEMATRIX AI Innovation Centre Machine Test challenge.

The objective was to create an original superhero help portal featuring:

Superhero identity
Origin story
Powers and abilities
Mission
Personality
Interactive chatbot
Visitor information collection
Grievance/request submission
Automatic email notification
Public deployment
🔮 Future Improvements

Possible future enhancements include:

Persistent conversation history
Secure request archive
User accounts
Advanced signal visualizations
Voice interaction
Additional superhero abilities
Multi-language conversation
Admin dashboard
Request analytics
Real-time network status
⚠️ Disclaimer

THE MYTH is a fictional superhero experience created as a web development project.

The conversational interface is intended to provide an interactive listening experience and does not replace professional medical, legal, emergency, or crisis services.

👨‍💻 Author

Melvin Manoj

Built with:

Next.js · React · TypeScript · Gemini · Gmail SMTP · Tailwind CSS

⭐ THE MYTH NETWORK

Everyone has a story.

Tell me yours.

THE MYTH IS LISTENING.