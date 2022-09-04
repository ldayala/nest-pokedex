import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Pokemon extends Document {

    //id: string, me lo da mongo
    @Prop({

        unique: true,
        index: true   //esto agerga un indice para la busqueda
    })
    name: string;
    @Prop({
        unique: true,
        index: true   //esto agerga un indice para la busqueda
    })
    no: number

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon)