import { HttpException } from ".";

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(500, "Internal server error");
  }
}
