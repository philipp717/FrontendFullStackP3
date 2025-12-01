import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

// Mocks
const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin
  })
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('shows error when fields are empty', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    
    expect(screen.getByText(/Por favor completa todos los campos/i)).toBeInTheDocument();
  });

  it('calls login function with correct credentials', async () => {
    mockLogin.mockResolvedValue({ user: { role: 'ADMIN' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    });
  });

  it('navigates to dashboard if user is ADMIN', async () => {
    mockLogin.mockResolvedValue({ user: { role: 'ADMIN' } });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'admin123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
