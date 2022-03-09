import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from 'src/movies/movies.model';

interface TrailerCreationAttrs {
  movieId: number;
  url: string;
}

@Table({ tableName: 'trailers', createdAt: false, updatedAt: false })
export class Trailer extends Model<Trailer, TrailerCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Movie)
  movieId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;
}
