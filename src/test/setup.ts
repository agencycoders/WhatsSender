import { vi } from 'vitest';

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Configuração global do localStorage
global.localStorage = localStorageMock;

// Limpa todos os mocks após cada teste
afterEach(() => {
  vi.clearAllMocks();
}); 