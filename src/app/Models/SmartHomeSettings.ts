import { Deserializable } from './Deserializable';

export class SmartHomeSettings implements Deserializable{

    public id:number;
    public interval:number;
    public workingFrom:number;
    public workingTo:number;
    public power:boolean;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}