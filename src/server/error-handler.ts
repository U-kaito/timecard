import { NextApiRequest, NextApiResponse } from "next";

export interface ApiHandler {
  (req: NextApiRequest, res: NextApiResponse): Promise<void>;
}

export function withErrorHandler(handler: ApiHandler): ApiHandler {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      res.status(500).json({ message: "An internal error occurred" });
      console.error(e);

      if (!(e instanceof Error)) return;
    }
  };
}
