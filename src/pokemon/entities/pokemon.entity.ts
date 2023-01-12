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

/* const PokemonSchema = SchemaFactory.createForClass(Pokemon);
PokemonSchema.methods.toJSON = function () {
  const calendarEvent = this.toObject();
  calendarEvent.id = calendarEvent._id;

  delete calendarEvent._id;
  delete calendarEvent.__v;

  return calendarEvent;
};

export { PokemonSchema }; */

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
