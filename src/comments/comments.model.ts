import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from 'src/movies/movies.model';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
  movieId: number;
  message: string;
}

@Table({ tableName: 'comments', updatedAt: false })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => Movie)
  movieId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @CreatedAt
  createdAt: Date;
}
