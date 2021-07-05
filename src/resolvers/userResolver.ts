import { User } from "../entities/User"
import { MyContext } from "../types"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql"

import * as argon2 from "argon2";
import { error } from "console";
import { isObjectType } from "graphql";
import { Post } from "src/entities/Post";
//

//input aruments
@InputType() 
class UserNameAndPasswordInput {
    @Field(() => String) 
    username: string
    @Field(() => String)
    password: string
}

//object type we return
@ObjectType() 
class FieldError {
    @Field() 
    field: string;

    @Field()
    message:string;

}
@ObjectType() 
class UserResponse {
    @Field(() => [FieldError],{nullable:true}) 
    errors?: FieldError[];

    @Field(() => User,{nullable:true})
    user?:User;

}
@Resolver()
export class UserResolver{
    // @Query(()=> [Post])
    // posts(
    //     @Ctx() ctx: MyContext
    // ):Promise<Post[]> {
    //     return ctx.em.find(Post,{})
    // }

    // @Query(()=> Post, {nullable:true})
    // post(
    //     @Arg('postId') id:number,
    //     @Ctx() ctx: MyContext
    // ):Promise<Post | null> {
    //     return ctx.em.findOne(Post,{id})
    // }

    @Mutation(()=>  UserResponse)
    async register(
        @Arg('options')  options: UserNameAndPasswordInput,
        @Ctx() {em}: MyContext
    ):Promise<UserResponse>{

        if(options.username.length <=2 ) {
            return {
                errors:[{
                    field:'username',
                    message:'length must be greater than 2'
                }]

                }
        }
        if(options.password.length <=3 ) {
            return {
                errors:[{
                    field:'password',
                    message:'length must be greater than 3'
                }]

                }
        }
        

        try {
            const hash = await argon2.hash(options.password);
            const user = em.create(User,{username:options.username,password:hash})
        await em.persistAndFlush(user)
        return {user}
        } catch (error) {
            return {
                errors:[{
                    field:'username',
                    message:"user name taken"
                }]

                }
        }
       
        
    }

    
    @Mutation(()=> UserResponse)
    async login(
        @Arg('options')  options: UserNameAndPasswordInput,
        @Ctx() {em}: MyContext
    ): Promise<UserResponse>{
        const user =await  em.findOne(User,{username:options.username})

        if(!user) {

            return {
                errors:[{
                    field:'username',
                    message:'user doesnt exist'
                }]

                }
        
        }
        const validate = await argon2.verify(user.password,options.password);
        // const user = em.create(User,{username:options.username,password:hash})
        // await em.persistAndFlush(user)
        if(!validate){
            return {
                errors:[{
                    field:'password',
                    message:'incorrect password'
                }]

                }
        }
        return{ 
            user
        }
    }

    // @Mutation(()=> Post,{nullable:true})
    // async updatePost(
    //     @Arg('id') id:number,
    //     @Arg('title',()=> String, {nullable:true}) title:string,
    //     @Ctx() ctx: MyContext
    // ):Promise<Post | null> {
    //     const post = await ctx.em.findOne(Post,{id});
    //     if(!post) {
    //         return null
    //     }
    //     if(typeof title !== 'undefined'){
    //         post.title = title;
           
    //         await ctx.em.persistAndFlush(post)
            
    //     }
      


      
    //     return post
    // }

    // @Mutation(()=> Boolean)
    // async deletePost(
    //     @Arg('id') id:number,
    //     @Ctx() ctx: MyContext
    // ):Promise<boolean> {
       
    //     try {
    //         await ctx.em.nativeDelete(Post,{id});
    //         return true
    //     } catch (error) {
    //         return false
    //     }
      


      
   
    // }
}