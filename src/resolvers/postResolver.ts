import { Post } from "../entities/Post";
import { MyContext } from "../types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

//
@Resolver()
export class PostResolver{
    @Query(()=> [Post])
    posts(
        @Ctx() ctx: MyContext
    ):Promise<Post[]> {
        return ctx.em.find(Post,{})
    }

    @Query(()=> Post, {nullable:true})
    post(
        @Arg('postId') id:number,
        @Ctx() ctx: MyContext
    ):Promise<Post | null> {
        return ctx.em.findOne(Post,{id})
    }

    @Mutation(()=> Post)
    async createPost(
        @Arg('title') title:string,
        @Ctx() ctx: MyContext
    ):Promise<Post | null> {
        const post = ctx.em.create(Post,{title})
        await ctx.em.persistAndFlush(post)
        return post
    }

    @Mutation(()=> Post,{nullable:true})
    async updatePost(
        @Arg('id') id:number,
        @Arg('title',()=> String, {nullable:true}) title:string,
        @Ctx() ctx: MyContext
    ):Promise<Post | null> {
        const post = await ctx.em.findOne(Post,{id});
        if(!post) {
            return null
        }
        if(typeof title !== 'undefined'){
            post.title = title;
           
            await ctx.em.persistAndFlush(post)
            
        }
      


      
        return post
    }

    @Mutation(()=> Boolean)
    async deletePost(
        @Arg('id') id:number,
        @Ctx() ctx: MyContext
    ):Promise<boolean> {
       
        try {
            await ctx.em.nativeDelete(Post,{id});
            return true
        } catch (error) {
            return false
        }
      


      
   
    }
}