import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useEmployees } from "@/client/employees/employee-hook";
import { css } from "@emotion/react";

export function EmployeeDialog({
  open,
  onClose,
  onEmailSent,
}: {
  open: boolean;
  onClose(): void;
  onEmailSent(): void;
}) {
  const { addEmployee } = useEmployees();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [owner, setOwner] = useState(false);

  const submitEmployee = useCallback(async () => {
    await addEmployee(firstName, lastName, email, password, owner);
    onEmailSent();
    onClose();
  }, [
    addEmployee,
    firstName,
    lastName,
    email,
    password,
    owner,
    onEmailSent,
    onClose,
  ]);

  return (
    <Dialog open={open} onClose={onClose} css={employeeDialogStyles}>
      <DialogTitle>従業員を追加する</DialogTitle>
      <DialogContent className="EmployeeDialog-Content">
        <TextField
          label="苗字"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="dense"
        />
        <TextField
          label="名前"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="dense"
        />
        <TextField
          label="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="dense"
        />
        <TextField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="dense"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={owner}
              onChange={() => setOwner((prev) => !prev)}
            />
          }
          label="管理者"
        />
        <Button onClick={submitEmployee}>追加</Button>
      </DialogContent>
    </Dialog>
  );
}

function employeeDialogStyles() {
  return css`
    .EmployeeDialog-Content {
      width: 400px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  `;
}
