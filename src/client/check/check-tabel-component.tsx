import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { css } from "@emotion/react";
import { useTimeSeach } from "@/client/check/time-seach-hook";
import { TimeStamp } from "@/common/mapper";

export function CheckTable({ year, month }: { year: number; month: number }) {
  const daysOfMonth = new Date(year, month, 0).getDate();
  const { data } = useTimeSeach(year, month);
  return (
    <div css={checkTableStyles}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>日</TableCell>
              <TableCell align="center">出勤時間</TableCell>
              <TableCell align="center">退勤時間</TableCell>
              <TableCell align="center">出勤場所</TableCell>
              <TableCell align="center">退勤場所</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: daysOfMonth }, (_, index) => {
              const time = data?.filter(
                (time: TimeStamp) => time.day === index + 1,
              );
              //１日に複数回打刻する場合どうするか
              let start: string = "-";
              let finish: string = "-";
              let startPlace: string = "-";
              let finishPlace: string = "-";
              if (time && time.length > 0) {
                const startTime = new Date(time[0].startTime);
                start = `${String(startTime.getHours()).padStart(
                  2,
                  "0",
                )}:${String(startTime.getMinutes()).padStart(2, "0")}`;
                startPlace = time[0].startPlace;
                if (time[0].finishTime) {
                  const finishTime = new Date(time[0].finishTime);
                  finish =
                    finishTime.getDate() == startTime.getDate()
                      ? `${String(finishTime.getHours()).padStart(
                          2,
                          "0",
                        )}:${String(finishTime.getMinutes()).padStart(2, "0")}`
                      : `${String(finishTime.getHours() + 24).padStart(
                          2,
                          "0",
                        )}:${String(finishTime.getMinutes()).padStart(2, "0")}`;
                  finishPlace = time[0].finishPlace!;
                }
              }
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="center">{start}</TableCell>
                  <TableCell align="center">{finish}</TableCell>
                  <TableCell align="center">{startPlace}</TableCell>
                  <TableCell align="center">{finishPlace}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function checkTableStyles() {
  return css``;
}
