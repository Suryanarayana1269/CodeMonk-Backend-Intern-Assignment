## CodeMonk-Backend-Intern-Assignment
Codemonk Backend Intern Assignment full-stack project repository! This project demonstrates a robust, scalable backend API with asynchronous task processing, paired with a modern, interactive React frontend — showcasing best practices across backend, frontend, and deployment.

# 📝 Codemonk Project

A **full-stack web application** with a modern **Django REST backend** and **React frontend**, designed to process paragraphs asynchronously, count word frequencies, and search stored text — all wrapped in a **Dockerized** environment for seamless development and deployment.

---

## 🚀 Project Overview

### **Backend**
- **Framework:** Django 5.x + Django REST Framework
- **Asynchronous Processing:** Celery with Redis as message broker
- **Database:** PostgreSQL
- **Authentication:** JWT via `djangorestframework-simplejwt`
- **Task Queue & Scheduler:** Handles paragraph processing asynchronously
- **API Documentation:** Swagger UI (`localhost:8000/`)
- **Containerized:** Docker + Docker Compose for easy setup

#### **Core Backend Features**
- 🔐 User registration & authentication
- 📄 Accept paragraphs & process asynchronously to count word frequencies
- 🔍 Search paragraphs by word occurrences
- 🛡 Robust error handling & secure endpoints

---

### **Frontend**
- **Framework:** React 19 + Vite for ultra-fast development
- **Styling:** TailwindCSS (utility-first, responsive design)
- **Animations:** Framer Motion for smooth UI/UX
- **Routing:** React Router for SPA navigation
- **API Integration:** Axios with JWT token handling

#### **Core Frontend Features**
- 📝 User registration & login with animated forms
- 📤 Submit paragraphs with live feedback
- 🔍 Search paragraphs with animated results & loading states
- 🔐 Logout & session management
- 📱 Responsive design for all screen sizes

---

## 📂 Project Structure
```
codemonk_project/
├── codemonk_backend/
│   ├── backend/             # Django project settings and entry points
│   ├── users/               # Custom user app (models, serializers, views)
│   ├── paragraphs/          # Paragraph processing and search APIs + Celery tasks
│   ├── Dockerfile           # Backend Dockerfile
│   ├── docker-compose.yml   # Composition of backend + Redis + DB + Celery
│   ├── requirements.txt     # Python dependencies
│   └── manage.py
│
└── codemonk_frontend/
    ├── src/
    │   ├── pages/           # Register, Login, Dashboard React pages
    │   ├── services/        # Axios API setup with JWT token handling
    │   ├── utils/           # Token management utilities
    │   ├── components/      # Reusable UI components (optional)
    │   ├── App.jsx          # React router & protected routes
    │   ├── main.jsx         # React app entry with TailwindCSS imports
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Setup & Run Instructions

### **Backend**
**Pre-requisites:** Docker & Docker Compose installed also activate the Virtual Environment.

```bash
cd codemonk_backend
docker-compose up --build
```
Backend/Swagger API Docs available at: http://localhost:8000/

### **Frontend**
Open a new terminal:
```
cd codemonk_frontend
npm install
npm run dev
```
Frontend available at: http://localhost:5173/

### 💻 Usage Flow
1. Register a new account at /register
2. Login with credentials at /login
3. Submit paragraphs via dashboard (processed asynchronously)
4. Search paragraphs by keyword
5. Logout to clear session

---

### 🌟 Key Features & Highlights
⚡ Async Task Processing: Celery offloads heavy processing from main request cycle

🔐 Secure JWT Auth: Token expiration, secure endpoints

🎨 Rich UI/UX: Animated, responsive forms & search results

🧩 Component-based React: Maintainable & scalable

🐳 Dockerized Setup: One-command start for full environment

📜 Swagger API Docs: Instant API reference


---

### 🛠 Technologies
| Layer    | Technology                                                      |
| -------- | --------------------------------------------------------------- |
| Backend  | Django REST Framework, Celery, Redis, PostgreSQL                |
| Frontend | React 19, Vite, TailwindCSS, Framer Motion, Axios, React Router |
| DevOps   | Docker, Docker Compose                                          |

---

### 🔮 Future Enhancements
🔄 Token refresh & session renewal

📄 Pagination for large search results

📧 Email verification

👤 User profile management

🧪 More unit & integration tests

⚡ CI/CD pipeline

♿ Accessibility & UX polish

---

### 🙏 Acknowledgements
I would like to sincerely thank Codemonk for providing this valuable internship opportunity. This assignment helped me deepen my understanding of backend and full-stack development, and challenged me to apply best practices in building scalable, secure, and well-documented applications. I truly appreciate the chance to demonstrate my skills and contribute to real-world problem-solving scenarios.

Thank you for this enriching experience!

---

#### Demo Video & ScreenShots
## Screenshots
# Backend
1. Backend/Swagger API Docs(http://localhost:8000/)
<img width="1919" height="1079" alt="docs" src="https://github.com/user-attachments/assets/e7354be8-8998-4959-9ef6-571be0057965" />

2. Backend-User/Register(http://localhost:8000/api/users/register/)
<img width="1897" height="864" alt="Register" src="https://github.com/user-attachments/assets/6465049a-a658-4a7a-bd6a-3f534c9ae6ed" />

3. Backend-Token(http://localhost:8000/api/token/)
<img width="1781" height="854" alt="Token" src="https://github.com/user-attachments/assets/4350405c-9cb0-4760-8d45-62b8c23bd3b0" />

4. Backend-Token(Refresh & Access Tokens)(http://localhost:8000/api/token/refresh/)
<img width="1767" height="620" alt="Token-Refresh and Access" src="https://github.com/user-attachments/assets/7044d948-d251-4a5d-8df4-c65967949d60" />

5. Backend-Paragraphs(ThunderClient - Authorize Token to post a Paragraphs)(http://localhost:8000/api/paragraphs/)
<img width="1621" height="485" alt="paraAccessToken" src="https://github.com/user-attachments/assets/e3615d55-87a5-4120-8609-9f006daeb806" />

6. Backend-Paragraphs(ThunderClient - Submit the Paragraph)(http://localhost:8000/api/paragraphs/)
<img width="1905" height="636" alt="Paragraph-Submit" src="https://github.com/user-attachments/assets/037bfc55-7715-4e44-bb39-b1ab4a7677e3" />

7. Backend-Paragraphs/Search(ThunderClient - Search a word in the Paragraphs and displaying the count in each paragraph)(http://localhost:8000/api/paragraphs/search/?word=to)
<img width="1629" height="865" alt="Paragraph-Search" src="https://github.com/user-attachments/assets/81c41d38-0f81-4993-bd1c-95dc8dd7ab45" />

---

# Frontend
1. Register Page
<img width="712" height="768" alt="Register-Page" src="https://github.com/user-attachments/assets/54fa0a2a-b132-4abb-83bf-08163dfa85f5" />

2. Login Page
<img width="687" height="596" alt="Login-Page" src="https://github.com/user-attachments/assets/fe1d0a39-42a1-4644-9f15-bc6b2cd91d38" />

3. Dashboard Page
<img width="1148" height="818" alt="Dashboard-Page" src="https://github.com/user-attachments/assets/2dd83a0f-b01e-4998-8cfd-bab513772f4c" />

4. Search Word Page
<img width="1095" height="655" alt="Search-Page" src="https://github.com/user-attachments/assets/e50d1f39-3255-40ef-9d05-f3b804ec0859" />

---

## Demo-Video
Video Link: https://drive.google.com/file/d/1TbUg_1X4Jk9KeRgk1rUrqLbBd4cZA-Cw/view?usp=drive_link

---

### Project-Directory files
https://drive.google.com/drive/folders/1fAQPbsKS3t0BXjmwgzzKFmCIO-9VumIP?usp=drive_link

---





