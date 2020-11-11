import { Deserializable } from './Deserializable';

export class SmartHomeData implements Deserializable {

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
   
    public id:string;
    public temperature:number;
    public humidity:number;
    public dateTime:Date;
    
  }