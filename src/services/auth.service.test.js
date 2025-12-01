/**
 * Tests unitarios para servicios
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthService from '../services/auth.service';
import apiClient from '../services/api.service';

// Mock de apiClient
vi.mock('../services/api.service', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

describe('AuthService', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('guarda token y user en localStorage cuando login es exitoso', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-token-123',
          user: {
            id: 1,
            username: 'testuser',
            nombre: 'Test User',
            email: 'test@example.com',
            role: 'ADMIN'
          }
        }
      };

      apiClient.post.mockResolvedValueOnce(mockResponse);

      const result = await AuthService.login({
        username: 'testuser',
        password: 'password123'
      });

      expect(localStorage.getItem('token')).toBe('test-token-123');
      expect(JSON.parse(localStorage.getItem('user'))).toEqual(mockResponse.data.user);
      expect(result.token).toBe('test-token-123');
    });

    it('lanza error cuando las credenciales son incorrectas', async () => {
      apiClient.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Credenciales inválidas' }
        }
      });

      await expect(
        AuthService.login({ username: 'wrong', password: 'wrong' })
      ).rejects.toThrow();
    });
  });

  describe('logout', () => {
    it('limpia localStorage correctamente', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify({ id: 1 }));

      AuthService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('retorna true cuando hay token y user', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify({ id: 1 }));

      expect(AuthService.isAuthenticated()).toBe(true);
    });

    it('retorna false cuando no hay token', () => {
      localStorage.removeItem('token');
      localStorage.setItem('user', JSON.stringify({ id: 1 }));

      expect(AuthService.isAuthenticated()).toBe(false);
    });

    it('retorna false cuando no hay user', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.removeItem('user');

      expect(AuthService.isAuthenticated()).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('retorna el usuario parseado desde localStorage', () => {
      const user = { id: 1, username: 'test', role: 'ADMIN' };
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', JSON.stringify(user));

      expect(AuthService.getCurrentUser()).toEqual(user);
    });

    it('retorna null cuando no hay usuario', () => {
      localStorage.removeItem('user');

      expect(AuthService.getCurrentUser()).toBeNull();
    });
  });

  describe('getToken', () => {
    it('retorna el token desde localStorage', () => {
      localStorage.setItem('token', 'my-token-123');

      expect(AuthService.getToken()).toBe('my-token-123');
    });

    it('retorna null cuando no hay token', () => {
      localStorage.removeItem('token');

      expect(AuthService.getToken()).toBeNull();
    });
  });
});
