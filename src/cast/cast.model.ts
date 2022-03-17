import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from '../movies/movies.model';

interface CastCreationAttrs {
  movieId: number;
  name: string;
}

@Table({ tableName: 'cast', createdAt: false, updatedAt: false })
export class Cast extends Model<Cast, CastCreationAttrs> {
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
  name: string;
}
