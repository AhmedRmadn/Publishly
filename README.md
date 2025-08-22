# 📚 Publishly

A modern, full-stack blogging platform where users can create, publish, and interact with rich articles. Built with FastAPI backend and React frontend, featuring real-time rich text editing, user authentication, and social features.

![Publishly Logo](readmeFiles/Publishly.png)

## ✨ Features

### 🔐 Authentication & User Management

- **User Registration & Login**: Secure signup and signin with JWT authentication
- **Profile Management**: Upload and change profile images and cover photos
- **User Profiles**: View other users' profiles and their published articles

### 📝 Article Creation & Management

- **Rich Text Editor**: Powered by Floara for advanced content styling
- **Media Support**: Add images, videos, and other media to articles
- **Article Publishing**: Create, edit, and publish articles with titles and posters
- **Content Styling**: Advanced text formatting, headings, lists, and more

### ❤️ Social Features

- **Like/Unlike Articles**: Interact with content through likes
- **Article Discovery**: Browse and discover articles from all users
- **User Engagement**: Connect with other writers and readers

## 🏗️ Architecture

### Backend (FastAPI)

- **Framework**: FastAPI with async support
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens with secure password hashing
- **File Handling**: Support for image uploads and media management
- **API**: RESTful API with automatic documentation

### Frontend (React)

- **Framework**: React 18 with modern hooks
- **Routing**: React Router for navigation
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS for responsive design
- **Rich Text**: Floara editor for content creation

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Publishly/server
   ```

2. **Create virtual environment**

   ```bash
   python -m venv env
   # On Windows
   env\Scripts\activate
   # On macOS/Linux
   source env/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the server directory:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/publishly
   SECRET_KEY=your-secret-key-here
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ```

5. **Database Setup**

   ```bash
   # Create PostgreSQL database
   createdb publishly

   # Run migrations (if available)
   # python -m alembic upgrade head
   ```

6. **Start the server**
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd ../client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 📱 Pages & Routes

### 🏠 Home Page (`/home`)

- **Purpose**: Display all published articles
- **Features**:
  - Article grid/list view
  - Article previews with titles and posters

![Home Page](readmeFiles/compressed/home.gif)

### 📄 Article Page (`/article/{article_id}`)

- **Purpose**: View full article content
- **Features**:
  - Rich text content display
  - Like/unlike functionality
  - Author profile link

![Article Page](readmeFiles/compressed/article.gif)

### ✍️ Upload Page (`/article/upload`)

- **Purpose**: Create and edit articles
- **Features**:
  - Rich text editor (Floara)
  - Title and poster input
  - Media upload support
  - Preview functionality
  - Save and publish options

![Upload Page](readmeFiles/upload.PNG)

### 👤 Profile Page (`/user/{username}`)

- **Purpose**: User profile management and viewing
- **Features**:
  - Profile and cover image display
  - User's published articles
  - Profile editing (for own profile)
  - Image upload functionality

![Profile Page](readmeFiles/compressed/profile.gif)

### 🔐 Authentication Pages

#### Sign In (`/signin`)

- **Purpose**: User login
- **Features**:
  - username and password fields
  - Sign up redirect

![Sign In Page](readmeFiles/signin.PNG)

#### Sign Up (`/signup`)

- **Purpose**: User registration
- **Features**:
  - Username, email, and password fields
  - Password confirmation
  - Terms and conditions
  - Sign in redirect

![Sign Up Page](readmeFiles/signup.PNG)

## 🔌 API Endpoints

### Authentication

```
POST /user/signup     - User registration
POST /user/login     - User login
```

### Users

```
GET    /user                             - Get authentacted user profile
GET    /user/{username}                  - Get user profile and his articles
POST   /user/update-profile-image        - Upload profile image
POST   /users/update-cover-image         - Upload cover image
```

### Articles

```
GET    /article                   - Get all articles 
GET    /article/{article_id}      - Get specific article's content HTML 
POST   /article/create-article    - Create new article
POST   /article/upload-image      - upload images of articles 
```

### Likes

```
GET   /like/{article_id}               - check if authentacted user likes an article or not
PUT    /like/{article_id}              - authentacted user likes an article
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User accounts, profiles, and authentication
- **Articles**: Blog posts with rich content
- **Likes**: User interactions with articles

![Database Diagram](readmeFiles/Publishly.png)

## 🛠️ Technology Stack

### Backend

- **Python 3.8+**: Core programming language
- **FastAPI**: Modern, fast web framework
- **PostgreSQL**: Primary database
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and serialization
- **JWT**: JSON Web Token authentication
- **Uvicorn**: ASGI server

### Frontend

- **React 18**: UI library with hooks
- **React Router**: Client-side routing
- **React Query**: Server state management
- **Tailwind CSS**: Utility-first CSS framework
- **Floara**: Rich text editor
- **Vite**: Build tool and dev server

### Development Tools

- **Git**: Version control
- **ESLint**: Code linting
- **Prettier**: Code formatting (if configured)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Protection**: Cross-origin resource sharing configuration
- **Input Validation**: Pydantic models for data validation
- **File Upload Security**: Secure file handling and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- FastAPI community for the excellent framework
- React team for the powerful frontend library
- Floara for the rich text editing capabilities
- Tailwind CSS for the utility-first styling approach

---

**Publishly** - Where ideas come to life through words and creativity.
