import { useEmployees } from "@/client/employees/employee-hook"
import { css } from "@emotion/react"
import { Theme } from "@mui/material"
import { EmployeeDialog } from "@/client/employees/employee-dialog-component"
import { useEffect, useState } from "react"

export function EmployeesPage() {
  const [emailSent, setEmailSent] = useState(false)
  const { employees } = useEmployees()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    if (emailSent) {
      setTimeout(() => {
        setEmailSent(false)
      }, 3000)
    }
  }, [emailSent])

  return (
    <div css={employeesPageStyles}>
      <EmployeeDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onEmailSent={() => setEmailSent(true)} />
      <div className="EmployeesPage-Header">
        <p className={`EmployeesPage-EmailLabel ${emailSent ? "EmployeesPage-EmailSent" : ""}`}>
          指定されたメールに、確認メールが送信されました!
        </p>
        <button className="EmployeesPage-NewEmployee" onClick={() => setDialogOpen(true)}>
          従業員を追加する
        </button>
      </div>
      <div className="EmployeesPage-Grid">
        {employees.map((employee) => (
          <div key={employee.id} className="EmployeesPage-Card">
            <p className="EmployeesPage-Name">
              {employee.lastName} {employee.firstName}
            </p>
            <p className="EmployeesPage-Email">{employee.email}</p>
            <p className="EmployeesPage-Misc">管理者: {employee.owner ? "はい" : "いいえ"}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function employeesPageStyles() {
  return css`
    .EmployeesPage-NewEmployee {
      display: block;
      margin-left: auto;
      margin-right: 20px;
      background-color: ;
      border: 1px solid ;
      padding: 5px 10px;
      border-radius: 3px;
      transition: border 0.2s ease-in-out;
      cursor: pointer;
      color: ;
      &:hover {
        background-color: ;
      }
    }

    .EmployeesPage-Header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .EmployeesPage-EmailLabel {
      color: ;
      opacity: 0;
      margin: 0;
      transition: opacity 0.2s ease-in-out;

      &.EmployeesPage-EmailSent {
        opacity: 1;
      }
    }

    .EmployeesPage-Grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding: 3px;
    }

    .EmployeesPage-Card {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #dadada;
      margin: 10px;
      transition: box-shadow 0.2s ease-in-out;

      &:hover {
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
      }
    }

    .EmployeesPage-Name {
      font-size: ;
      margin: 0;
    }

    .EmployeesPage-Email {
      color: ;
      font-size: 0.9rem;
      margin-top: 0;
      margin-bottom: 10px;
    }

    .EmployeesPage-Owner {
      font-size: 0.9rem;
      margin: 0;
    }
  `
}
