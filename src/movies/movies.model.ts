import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Cast } from 'src/cast/cast.model';
import { Comment } from 'src/comments/comments.model';

interface MovieCreationAttrs {
  title: string;
  posterUrl: string;
  year: number;
  duration: string;
  rating: string;
}

@Table({ tableName: 'movies', createdAt: false, updatedAt: false })
export class Movie extends Model<Movie, MovieCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  posterUrl: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  duration: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  rating: number;

  @HasMany(() => Cast)
  cast: Cast[];

  @HasMany(() => Comment)
  comments: Comment[];
}
