import { __prod__ } from "./constants";
import { Post } from "./entities/Posts";
import {MikroORM} from "@mikro-orm/core"
import path from "path";
export default {
  
    entities: [Post],
    dbName: 'lireddit',
    password:'1234',
 
    type: 'postgresql', 
    debug: !__prod__,
    migrations: {
        
      path:path.join(__dirname,'./migrations') , // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    
    },
  } as Parameters<typeof MikroORM.init>[0];