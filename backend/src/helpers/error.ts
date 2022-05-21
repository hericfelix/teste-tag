export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
export const handleError = (err, res) => {
  if (err instanceof ErrorHandler) {
    const { statusCode, message } = err;

    return res.status(statusCode).json({ error: message });
  }

  return res.status(400).json(err);
};
