import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import { Post } from './entities/Posts';
import mikroOrmConfig from './mikro-orm.config';

const main = async () =>{
    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.getMigrator().up()
    const post = orm.em.create(Post,{title:"my first title"})
    await orm.em.persistAndFlush(post)
    
}

main()
//j