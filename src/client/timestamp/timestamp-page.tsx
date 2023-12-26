import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import { useSession } from "@/client/session/session-hook";
import { useTimeStamp } from "@/client/timestamp/timestamp-hook";
import { toast } from "react-toastify";

interface Location {
  lat: number;
  lng: number;
}

export function TimestampPage() {
  const { loading, session } = useSession();
  const { attend, leave } = useTimeStamp();
  const [coordinates, setCoordinates] = useState<Location | null>(null);

  const handleButtonClick = async (action: "attend" | "leave") => {
    const currentTime = new Date();
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const { latitude, longitude } = position.coords;
      setCoordinates({ lat: latitude, lng: longitude });

      if (action === "attend") {
        toast("出勤しました");
        await attend({
          date: currentTime.toString(),
          lat: latitude,
          lng: longitude,
        });
      } else {
        toast("退勤しました");
        await leave({
          date: currentTime.toString(),
          lat: latitude,
          lng: longitude,
        });
      }
    } catch (error) {
      toast("位置情報が取得できませんでした");
    }
  };

  return (
    <div css={TimestampPageStyles}>
      <div className="name">
        {loading ? <p>ようこそ</p> : <p>ようこそ {session?.name}様</p>}
      </div>
      <div className="button-container">
        <button
          className="attendance-button green"
          onClick={() => handleButtonClick("attend")}
        >
          出勤
        </button>
        <button
          className="attendance-button red"
          onClick={() => handleButtonClick("leave")}
        >
          退勤
        </button>
      </div>
    </div>
  );
}

function TimestampPageStyles() {
  return css`
    .name {
      text-align: center;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .button-container {
      display: flex; /* ボタンを横並びに配置 */
      justify-content: space-between; /* ボタンを均等に配置 */
      gap: 20px;
    }

    /* 共通のボタンスタイル */
    .attendance-button {
      padding: 30px 60px;
      border: none;
      cursor: pointer;
      font-size: 20px;
      border-radius: 10px;
    }

    /* "出勤" ボタンのスタイル */
    .green {
      background-color: green;
      color: white;
    }

    /* "退勤" ボタンのスタイル */
    .red {
      background-color: red;
      color: white;
    }
  `;
}
