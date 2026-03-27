import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updateModal, setUpdateModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    userName: "",
    password: "",
    role: "SBO",
    substationId: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:7000/admin/all-employees", {
      withCredentials: true
    });
    console.log(res.data);
    setEmployees(res.data.data);
  };

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(
        `http://localhost:7000/admin/employees/${editingId}`,
        form,
        { withCredentials: true }
      );
    } else {
      await axios.post(
        "http://localhost:7000/admin/employees",
        form,
        { withCredentials: true }
      );
    }

    resetForm();
    fetchEmployees();
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:7000/admin/employees/${id}`,
        { withCredentials: true }
      );
      console.log("Deleted:", res.data);
      fetchEmployees();
    } catch (err) {
      console.error("DELETE ERROR:", err.response?.data || err.message);
    }
  };

  // EDIT
  const handleEdit = (emp) => {
    setForm(emp);
    setEditingId(emp.employeeId);
  };

  const resetForm = () => {
    setForm({
      employeeId: "",
      name: "",
      userName: "",
      password: "",
      role: "SBO",
      substationId: ""
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">

      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition"
      >
        Add Employee
      </button>

      {/*  TABLE */}
      <div className="bg-[#0D1422] p-4 rounded-xl border border-[#1A2B3C]">

        <table className="w-full text-sm">
          <thead className="text-[#4E6680]">
            <tr>
              <th className="text-left py-2">ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Substation</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map(emp => (
              <tr key={emp.employeeId} className="border-t border-[#1A2B3C] text-center">

                <td className="text-left py-2">{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.userName}</td>
                <td>{emp.role}</td>
                <td>{emp.substationId}</td>

                {/* ACTIONS */}
                <td className="flex justify-center gap-3 py-2">

                  <button
                    onClick={() => { setUpdateModal(true); setSelectedEmployee(emp) }}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setDeleteModal(true);
                    }}

                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
      {/* add employee modal */}
      {
        open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-[#0D1422] p-6 rounded-xl w-[400px] border border-[#1A2B3C]">

              <h3 className="mb-4 font-semibold">Add Employee</h3>

              <div className="space-y-3">

                <input
                  placeholder="Employee ID"
                  className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
                  onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                />

                <input
                  placeholder="Name"
                  className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  placeholder="Username"
                  className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
                  onChange={(e) => setForm({ ...form, userName: e.target.value })}
                />

                <div className="relative">

                  <input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-[#1e1e2f] px-3 py-2 pr-10 rounded"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                </div>

                <select
                  value={form.substationId}
                  onChange={(e) => setForm({ ...form, substationId: e.target.value })}
                  className="w-full bg-[#1e1e2f] px-3 py-2 rounded">
                  <option value="" disabled >Select Substation</option>
                  <option value="PSS-ANI">Aniyakanda PSS</option>
                  <option value="PSS-MAB">Mabola PSS</option>
                </select>

              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 mt-4">

                <button
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 text-sm text-gray-400"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-purple-600 px-4 py-2 rounded text-sm"
                >
                  Save
                </button>

              </div>

            </div>
          </div>
        )
      }

      {/* delete employee modal */}
      {deleteModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#0D1422] p-6 rounded-2xl w-[380px] border border-[#1A2B3C] shadow-xl animate-fadeIn">

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-white mb-3">
              Delete Employee
            </h3>

            {/* MESSAGE */}
            <p className="text-sm text-gray-400 mb-5">
              Are you sure you want to delete{" "}
              <span className="text-red-400 font-medium">
                {selectedEmployee.employeeId}
              </span>
              ? This action cannot be undone.
            </p>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedEmployee(null);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleDelete(selectedEmployee.employeeId);
                  setDeleteModal(false);
                  setSelectedEmployee(null);
                }}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}


      {/* update modal */}
      {updateModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-[#0D1422] p-6 rounded-2xl w-[400px] border border-[#1A2B3C] shadow-xl animate-fadeIn">


            <h3 className="mb-4 font-semibold text-white">
              Update Employee
            </h3>

            {/* FORM */}
            <div className="space-y-3">

              <input
                value={selectedEmployee.employeeId}
                disabled
                className="w-full bg-[#1e1e2f] px-3 py-2 rounded opacity-60 cursor-not-allowed"
              />

              <input
                value={selectedEmployee.name}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
                }
                className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
                placeholder="Name"
              />

              <input
                value={selectedEmployee.userName}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, userName: e.target.value })
                }
                className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
                placeholder="Username"
              />

              <input
                type="password"
                placeholder="New Password"
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, password: e.target.value })
                }
                className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
              />

              <select
                value={selectedEmployee.substationId}
                onChange={(e) =>
                  setSelectedEmployee({ ...selectedEmployee, substationId: e.target.value })
                }
                className="w-full bg-[#1e1e2f] px-3 py-2 rounded"
              >
                <option value="PSS-ANI">Aniyakanda PSS</option>
                <option value="PSS-MAB">Mabola PSS</option>
              </select>

            </div>

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => {
                  setUpdateModal(false);
                  setSelectedEmployee(null);
                }}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {
                    await axios.put(
                      `http://localhost:7000/admin/employees/${selectedEmployee.employeeId}`,
                      selectedEmployee,
                      { withCredentials: true }
                    );

                    setUpdateModal(false);
                    setSelectedEmployee(null);
                    fetchEmployees();
                  } catch (err) {
                    console.error("UPDATE ERROR:", err.response?.data || err.message);
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Update
              </button>

            </div>

          </div>
        </div>
      )}
    </div >
  );
}