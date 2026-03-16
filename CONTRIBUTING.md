# Contributing to MedVoice AI

Thank you for your interest in contributing to MedVoice AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others succeed

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Git
- VS Code (recommended)

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/amartya3ac/medvoice_ai.git
cd medvoice_ai

# Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# Create .env.local with your credentials
# See README.md for env configuration

# Start development
npm run dev
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming convention:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code improvements
- `test/` - Test additions

### 2. Make Changes

**Frontend (React/Next.js):**

- Keep components focused (single responsibility)
- Use React hooks
- Add TypeScript types
- Follow Tailwind CSS conventions

**Backend (Python/FastAPI):**

- Use async/await patterns
- Add docstrings
- Validate input with Pydantic
- Keep functions small

### 3. Test Your Changes

```bash
# Frontend linting
npm run lint

# Manual testing
npm run dev
# Visit http://localhost:3000

# Backend testing
cd backend
python -m pytest  # if tests exist
cd ..
```

### 4. Commit with Clear Messages

```bash
git add .
git commit -m "feat: add prescription parsing feature"
```

Commit message format:

```
type: subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:

- Clear title and description
- Reference any related issues
- Screenshots for UI changes
- Test results

## Code Style

### Frontend (TypeScript/React)

```typescript
// Use functional components
export default function MyComponent() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Logic here
  }, []);

  return <div className="...">Content</div>;
}

// Always provide types
interface Props {
  name: string;
  age: number;
}
```

### Backend (Python)

```python
# Use type hints
def get_user(user_id: str) -> dict:
    """Get user by ID from database."""
    return db.query(User).get(user_id)

# Use async for I/O operations
async def fetch_user(user_id: str):
    result = await db.fetch(...)
    return result
```

### CSS (Tailwind)

```jsx
// Use utility classes
<div className="bg-slate-900 text-white p-4 rounded-lg shadow-lg">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

## Adding Features

### New API Endpoint

1. **Backend** (`backend/main.py`):

```python
@app.post("/api/new-feature")
async def new_feature(request: YourModel):
    result = await process(request)
    return {"status": "success", "data": result}
```

2. **Frontend** (`src/app/api/new-feature/route.ts`):

```typescript
export async function POST(req: Request) {
  const data = await req.json();
  const response = await fetch("http://localhost:8000/api/new-feature", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Response.json(await response.json());
}
```

3. **Call in Component**:

```typescript
const response = await fetch("/api/new-feature", {
  method: "POST",
  body: JSON.stringify(data),
});
```

### New Database Table

1. Add to `backend/database/migrations.sql`
2. Include RLS policies
3. Run in Supabase SQL Editor
4. Update backend models

## Reporting Issues

Use GitHub Issues with:

- Clear title
- Reproduction steps
- Expected vs actual behavior
- Environment details (OS, Node/Python version)
- Screenshots/logs

## Pull Request Guidelines

- Keep PRs focused on one feature/fix
- Provide clear description
- Reference related issues (#123)
- Ensure code passes lint
- Add tests if applicable
- Update documentation

## Dependency Management

### Adding a Package

```bash
# Frontend
npm install package-name

# Backend
cd backend
pip install package-name
pip freeze > requirements.txt
cd ..
```

**Before adding:**

- Check if we already have similar functionality
- Verify package is actively maintained
- Consider bundle size impact
- Check for security vulnerabilities

### Removing Packages

```bash
# Frontend
npm uninstall package-name

# Backend
pip uninstall package-name
pip freeze > requirements.txt
```

## Performance Best Practices

- **Frontend:**
  - Use lazy loading for routes
  - Optimize images
  - Minimize bundle size
  - Use React.memo for expensive components

- **Backend:**
  - Use caching for repeated queries
  - Implement rate limiting
  - Use indexes on frequently queried columns
  - Batch database operations

- **Database:**
  - Add indexes to filter columns
  - Use pagination
  - Archive old data
  - Regular backups

## Security Guidelines

- Never commit API keys (use .env.local)
- Validate all user input
- Use parameterized queries
- Implement rate limiting
- Keep dependencies updated
- Follow OWASP guidelines

## Documentation

- Update README if adding features
- Add docstrings to functions
- Document complex logic
- Keep changelog updated
- Add comments for "why", not "what"

## Testing

```bash
# Run linter
npm run lint

# Manual testing checklist:
- Test on desktop
- Test on mobile
- Test with different user roles
- Test error scenarios
- Test with slow network
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release on GitHub
4. Tag the commit

## Questions?

- Open an issue
- Email: amartyahub03@gmail.com
- Check existing issues first

## Credits

Contributors will be recognized in:

- GitHub contributors page
- Project documentation

---

Thank you for contributing to MedVoice AI! 🎉

**Happy coding!** ❤️
