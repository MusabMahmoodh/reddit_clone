import { User } from "../entities/User"
import { MyContext } from "../types"
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql"

import * as argon2 from "argon2";
//
@InputType() 
class UserNameAndPasswordInput {
    @Field(() => String) 
    username: string
    @Field(() => String)
    password: string
}
//
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

    @Mutation(()=> User)
    async register(
        @Arg('options')  options: UserNameAndPasswordInput,
        @Ctx() {em}: MyContext
    ){
        const hash = await argon2.hash(options.password);
        const user = em.create(User,{username:options.username,password:hash})
        await em.persistAndFlush(user)
        return user
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