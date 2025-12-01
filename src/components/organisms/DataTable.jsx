/**
 * Componente organismo: DataTable
 * Tabla de datos reutilizable con acciones
 */
import PropTypes from 'prop-types';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';

function DataTable({ 
  columns, 
  data, 
  loading = false,
  onEdit,
  onDelete,
  actions = []
}) {
  if (loading) {
    return <LoadingSpinner message="Cargando datos..." />;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
            {(onEdit || onDelete || actions.length > 0) && (
              <th>Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {(onEdit || onDelete || actions.length > 0) && (
                <td>
                  {onEdit && (
                    <Button
                      variant="icon"
                      onClick={() => onEdit(row)}
                      className="btn-edit"
                      title="Editar"
                    >
                      ✏️
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="icon"
                      onClick={() => onDelete(row)}
                      className="btn-delete"
                      title="Eliminar"
                    >
                      🗑️
                    </Button>
                  )}
                  {actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="icon"
                      onClick={() => action.onClick(row)}
                      className={action.className}
                      title={action.title}
                    >
                      {action.icon}
                    </Button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    header: PropTypes.string.isRequired,
    render: PropTypes.func
  })).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    title: PropTypes.string
  }))
};

export default DataTable;
