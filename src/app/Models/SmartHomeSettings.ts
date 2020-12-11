import { Deserializable } from './Deserializable';

export class SmartHomeSettings implements Deserializable{

    public id;
    public interval;
    public workingFrom;
    public workingTo;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

}