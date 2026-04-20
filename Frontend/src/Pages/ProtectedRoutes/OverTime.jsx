import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


function OverTime() {

  const [otHours, setOtHours] = useState([]);

  useEffect(() => {

    const fetchOT = async () => {
      try {

        const response = await axios.get(`http://localhost:7001/admin/getOtHours`, { withCredentials: true })
        setOtHours(response.data);
        console.log("ot hours", response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOT()
  }, [])

  return (
    <div>
      {otHours && (
        <table className="w-full text-sm text-center">
          <thead className="text-[#4E6680] border-b border-[#1A2B3C]">
            <tr>
              <th>Employee Id</th>
              <th>Name</th>
              <th>OverTime Hours </th>
              <th>Total working Hours</th>
              <th>Week Start Date</th>
              <th>week End date</th>
            </tr>
          </thead>

          <tbody>
            {otHours.map((data, index) => {

              return (
                <tr className="border-t border-[#1A2B3C] hover:bg-[#111827] transition">
                  <td className="p-3">{data.employeeId || data.id}</td>
                  <td className="p-3">{data.name}</td>
                  <td className="p-3">{data.overtime_hours}</td>
                  <td className="p-3">{data.total_hours}</td>
                  <td className="p-3">
                    {new Date(data.week_start_date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(data.week_end_date).toLocaleDateString()}
                  </td>
                </tr>
              )

            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OverTime
