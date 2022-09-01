import { HttpException } from ".";

export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}
