import "reflect-metadata";
import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
// import { Post } from './entities/Posts';
import mikroOrmConfig from './mikro-orm.config';
//
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolversHello';
import { PostResolver } from './resolvers/postResolver';
import { UserResolver } from "./resolvers/userResolver";
const main = async () =>{
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up()
    // const post = orm.em.create(Post,{title:"my first title"})
    // await orm.em.persistAndFlush(post)
//
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,PostResolver,UserResolver],
            validate:false
        }),
        context: () => ({em:orm.em})
       
     });
     apolloServer.applyMiddleware({ app });

    // app.get('/',(_,res)=>{
    //     res.send("Hello")
    // })
   app.listen(4000,() => {
       console.log("listen on 4000")
   }) 
    
}

main()
//