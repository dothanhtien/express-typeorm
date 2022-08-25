import { HttpException } from ".";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}
