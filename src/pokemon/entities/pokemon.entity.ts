import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // id: sting  <-  Me lo da MongoDB

  // index - genera 1 index para poderlo buscar
  @Prop({ unique: true, index: true, required: true })
  name: string;

  @Prop({ unique: true, index: true, required: true })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
