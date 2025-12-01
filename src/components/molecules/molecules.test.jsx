/**
 * Tests unitarios para componentes moleculares
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../molecules/Card';
import FormField from '../molecules/FormField';
import Modal from '../molecules/Modal';
import StatCard from '../molecules/StatCard';

describe('Molecules - Card', () => {
  it('renderiza con título y contenido', () => {
    render(
      <Card title="Test Card">
        <p>Content here</p>
      </Card>
    );
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('renderiza footer cuando se proporciona', () => {
    render(
      <Card footer={<button>Action</button>}>
        Content
      </Card>
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('llama onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('Molecules - FormField', () => {
  it('renderiza label e input', () => {
    render(
      <FormField
        label="Username"
        name="username"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('muestra asterisco cuando es required', () => {
    render(
      <FormField
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('muestra mensaje de error cuando se proporciona', () => {
    render(
      <FormField
        label="Password"
        name="password"
        value=""
        onChange={() => {}}
        error="Password is required"
      />
    );
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});

describe('Molecules - Modal', () => {
  it('no renderiza cuando isOpen es false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Modal content
      </Modal>
    );
    expect(container.firstChild).toBeNull();
  });

  it('renderiza cuando isOpen es true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('llama onClose cuando se hace click en overlay', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    );
    const overlay = screen.getByText('Content').closest('.modal-overlay');
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalled();
  });

  it('no llama onClose cuando se hace click en el contenido', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByText('Content'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});

describe('Molecules - StatCard', () => {
  it('renderiza con título, ícono y color', () => {
    render(
      <StatCard
        title="Total Productos"
        icon="📦"
        color="#4A90E2"
      />
    );
    expect(screen.getByText('Total Productos')).toBeInTheDocument();
    expect(screen.getByText('📦')).toBeInTheDocument();
  });

  it('renderiza con contador cuando se proporciona', () => {
    render(
      <StatCard
        title="Total Boletas"
        count={42}
        icon="📋"
        color="#50C878"
      />
    );
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('llama onClick cuando se hace click', () => {
    const handleClick = vi.fn();
    render(
      <StatCard
        title="Test"
        icon="🔥"
        color="#FF0000"
        onClick={handleClick}
      />
    );
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalled();
  });
});
