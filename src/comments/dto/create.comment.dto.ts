export class CreateCommentDto {
  readonly userId: number;
  readonly movieId: number;
  readonly message: string;
}
