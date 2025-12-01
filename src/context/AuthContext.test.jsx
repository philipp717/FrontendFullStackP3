/**
 * Tests unitarios para AuthContext
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import AuthService from '../services/auth.service';

// Mock de AuthService
vi.mock('../services/auth.service', () => ({
  default: {
    getCurrentUser: vi.fn(),
    isAuthenticated: vi.fn(),
    login: vi.fn(),
    logout: vi.fn()
  }
}));

// Componente de prueba que usa useAuth
function TestComponent() {
  const { user, loading, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="loading">{loading ? 'Loading' : 'Loaded'}</div>
      <div data-testid="user">{user ? user.nombre : 'No user'}</div>
      <button onClick={() => login({ username: 'test', password: 'test' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('proporciona usuario cuando está autenticado', async () => {
    const mockUser = { id: 1, nombre: 'Test User', role: 'ADMIN' };
    AuthService.getCurrentUser.mockReturnValue(mockUser);
    AuthService.isAuthenticated.mockReturnValue(true);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Test User');
      expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    });
  });

  it('no proporciona usuario cuando no está autenticado', async () => {
    AuthService.getCurrentUser.mockReturnValue(null);
    AuthService.isAuthenticated.mockReturnValue(false);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('No user');
    });
  });

  it('cambia loading a false después de inicialización', async () => {
    AuthService.getCurrentUser.mockReturnValue(null);
    AuthService.isAuthenticated.mockReturnValue(false);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Inicialmente debería estar cargando
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading');

    // Después debería terminar de cargar
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('Loaded');
    });
  });
});
