import { IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";

export class CriaRecadoDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    readonly texto: string;
    
    @IsPositive()
    deId: number;

    @IsPositive()
    paraId: number;
}
