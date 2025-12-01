/**
 * Tests unitarios para componentes atómicos
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Badge from '../atoms/Badge';
import LoadingSpinner from '../atoms/LoadingSpinner';

describe('Atoms - Button', () => {
  it('renderiza correctamente con children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('llama onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no llama onClick cuando está disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aplica la variante correcta', () => {
    const { container } = render(<Button variant="danger">Delete</Button>);
    expect(container.firstChild).toHaveClass('btn-danger');
  });

  it('renderiza con ícono', () => {
    render(<Button icon="🔥">Hot</Button>);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });
});

describe('Atoms - Input', () => {
  it('renderiza con valor inicial', () => {
    render(<Input name="test" value="Hello" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('Hello');
  });

  it('llama onChange cuando se escribe', () => {
    const handleChange = vi.fn();
    render(<Input name="test" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renderiza como required', () => {
    render(<Input name="test" value="" onChange={() => {}} required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('respeta el atributo disabled', () => {
    render(<Input name="test" value="" onChange={() => {}} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

describe('Atoms - Badge', () => {
  it('renderiza con el texto correcto', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('aplica la variante correcta', () => {
    const { container } = render(<Badge variant="pendiente">Pendiente</Badge>);
    expect(container.firstChild).toHaveClass('badge-pendiente');
  });
});

describe('Atoms - LoadingSpinner', () => {
  it('renderiza con mensaje por defecto', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('renderiza con mensaje personalizado', () => {
    render(<LoadingSpinner message="Procesando datos..." />);
    expect(screen.getByText('Procesando datos...')).toBeInTheDocument();
  });
});
