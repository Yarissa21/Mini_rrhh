import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../hook/useEmployees';

const statusConfig = {
  active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Activo' },
  inactive: { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactivo' },
  on_leave: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En permiso' },
};

const roleLabels = {
  employee: 'Empleado',
  hr: 'Recursos Humanos',
  admin: 'Administrador',
};

function formatSalary(salary: number) {
  return salary.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('es-GT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const employeeId = id ? Number(id) : null;

  const { data: employee, isLoading, isError, error } = useEmployee(employeeId);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Botón Volver */}
      <button
        onClick={() => navigate('/empleados')}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
      >
        ← Volver a empleados
      </button>

      {/* Estado de carga */}
      {isLoading && (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mr-3" />
          <span>Cargando empleado...</span>
        </div>
      )}

      {/* Estado de error */}
      {isError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 font-medium">Error al cargar el empleado</p>
          <p className="text-red-500 text-sm mt-1">
            {(error as Error)?.message || 'Error desconocido'}
          </p>
        </div>
      )}

      {/* Detalle del empleado */}
      {!isLoading && !isError && employee && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden text-blue-700 font-semibold text-2xl flex-shrink-0">
              {employee.avatarUrl ? (
                <img
                  src={employee.avatarUrl}
                  alt={`Avatar de ${employee.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                employee.name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
              <p className="text-slate-500">{employee.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Email</p>
              <p className="text-slate-800">{employee.email}</p>
            </div>

            {employee.phone && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Teléfono</p>
                <p className="text-slate-800">{employee.phone}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Departamento</p>
              <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                {employee.department}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Estado</p>
              <span
                className={`inline-block mt-1 text-xs px-2.5 py-1 rounded-full font-medium ${statusConfig[employee.status].bg} ${statusConfig[employee.status].text}`}
              >
                {statusConfig[employee.status].label}
              </span>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Rol</p>
              <p className="text-slate-800">{roleLabels[employee.role]}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Salario mensual</p>
              <p className="text-slate-800">{formatSalary(employee.salary)}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase">Fecha de ingreso</p>
              <p className="text-slate-800">{formatDate(employee.hireDate)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDetailPage;