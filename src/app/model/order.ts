import { Address } from "./address";
import { Item } from "./item";
import { OrderedItem } from "./ordered-item";

export interface Order {
    id:number;
    orderedItems:OrderedItem[];
    userId:number;
    userName:String;
    name: String;
    address:Address;
    orderStatus:String;

}
