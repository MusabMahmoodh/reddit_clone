import { Entity,PrimaryKey ,Property} from "@mikro-orm/core";
import { Field,  ObjectType } from "type-graphql";
@ObjectType() //to make this as type script type
@Entity()
export class User {
    @Field()
    @PrimaryKey()
    id!: number;
    @Field(() => String)
    @Property({type:"date"})
    createdAt = new Date();

    @Field(() => String)
    @Property({type:"date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({type:"text",unique:true})
    username!: string;

    //not expose password
    @Property({type:"text"})
    password!: string;

   


}