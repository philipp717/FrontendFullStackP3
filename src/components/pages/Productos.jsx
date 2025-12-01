import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../templates/AdminLayout';
import DataTable from '../organisms/DataTable';
import Modal from '../molecules/Modal';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import ProductoService from '../../services/producto.service';
import CategoriaService from '../../services/categoria.service';

function Productos() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: '',
    rareza: '',
    setPokemon: '',
    categoriaId: ''
  });

  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await ProductoService.getAll();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      alert('Error al cargar productos: ' + (error.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.getAll();
      setCategorias(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      alert('Error al cargar categorías: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Preparar datos convirtiendo strings a números donde corresponda
      const productoData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio), // Convertir a número
        stock: parseInt(formData.stock, 10), // Convertir a número entero
        imagen: formData.imagen,
        rareza: formData.rareza,
        setPokemon: formData.setPokemon, // Usar setPokemon en lugar de set
        categoriaId: parseInt(formData.categoriaId, 10) // Convertir a número entero
      };

      if (editingProducto) {
        await ProductoService.update(editingProducto.id, productoData);
        alert('Producto actualizado exitosamente');
      } else {
        await ProductoService.create(productoData);
        alert('Producto creado exitosamente');
      }
      
      setShowModal(false);
      resetForm();
      await loadProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar producto: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio.toString(),
      stock: producto.stock.toString(),
      imagen: producto.imagen || '',
      rareza: producto.rareza,
      setPokemon: producto.setPokemon || producto.set || '',
      categoriaId: producto.categoriaId?.toString() || producto.categoria?.id?.toString() || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    try {
      await ProductoService.delete(id);
      alert('Producto eliminado exitosamente');
      await loadProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto: ' + (error.message || 'Error desconocido'));
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      imagen: '',
      rareza: '',
      setPokemon: '',
      categoriaId: ''
    });
    setEditingProducto(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const headerActions = [
    {
      label: 'Nuevo Producto',
      onClick: () => { resetForm(); setShowModal(true); },
      icon: '➕'
    }
  ];

  const columns = [
    { key: 'id', header: 'ID' },
    { 
      key: 'imagen', 
      header: 'Imagen',
      render: (row) => (
        <img src={row.imagen} alt={row.nombre} className="product-thumb" />
      )
    },
    { 
      key: 'nombre', 
      header: 'Nombre',
      render: (row) => <strong>{row.nombre}</strong>
    },
    { 
      key: 'categoria', 
      header: 'Categoría',
      render: (row) => row.categoria?.nombre
    },
    { 
      key: 'precio', 
      header: 'Precio',
      render: (row) => `$${row.precio.toLocaleString('es-CL')}`
    },
    { 
      key: 'stock', 
      header: 'Stock',
      render: (row) => (
        <span className={row.stock < 5 ? 'stock-low' : 'stock-ok'}>
          {row.stock}
        </span>
      )
    },
    { key: 'rareza', header: 'Rareza' },
    { 
      key: 'set', 
      header: 'Set',
      render: (row) => row.setPokemon || row.set
    }
  ];

  return (
    <AdminLayout
      title="📦 Gestión de Productos"
      headerActions={headerActions}
      activeMenuItem="/productos"
    >
      <DataTable
        columns={columns}
        data={productos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingProducto ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <FormField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
            
            <div className="form-group">
              <label>Categoría *</label>
              <select
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar...</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              rows="3"
            />
          </div>

          <div className="form-row">
            <FormField
              label="Precio"
              name="precio"
              type="number"
              value={formData.precio}
              onChange={handleInputChange}
              required
              min="0"
            />
            
            <FormField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>

          <div className="form-row">
            <FormField
              label="Rareza"
              name="rareza"
              value={formData.rareza}
              onChange={handleInputChange}
              required
            />
            
            <FormField
              label="Set Pokémon"
              name="setPokemon"
              value={formData.setPokemon}
              onChange={handleInputChange}
              required
              placeholder="Ej: Vivid Voltage"
            />
          </div>

          <FormField
            label="URL de Imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleInputChange}
            placeholder="https://..."
          />

          <div className="modal-actions">
            <Button type="submit" variant="primary">
              {editingProducto ? 'Actualizar' : 'Crear'} Producto
            </Button>
            <Button 
              type="button" 
              onClick={() => setShowModal(false)}
              variant="secondary"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}

export default Productos;
