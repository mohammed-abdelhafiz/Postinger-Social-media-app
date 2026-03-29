export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public path?: string
  ) {
    super(message);
  }
}