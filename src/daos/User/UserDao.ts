import { IUser } from '@entities/User';
import { userSchema } from '@daos/schema';
import bcrypt from 'bcryptjs';

export interface IUserDao {
    getOne: (email: string) => Promise<any | null>;
    getAll: () => Promise<any[]>;
    add: (user: IUser) => Promise<void>;
    update: (user: IUser) => Promise<void>;
    delete: (email:string) => Promise<void>;
}

class UserDao implements IUserDao {

    public async getOne(email: string): Promise<any | null> {
        const result = await userSchema.find({email:email});
        console.log(result);
        return result;
    }

    public async getAll(): Promise<any[]> {
        const result = await userSchema.find();
        console.log(result);
        return result;
    }

    public async add(user: IUser): Promise<void> {
        const result = await userSchema.create(user);
        console.log(result);
        return {} as any;
    }

    public async update(user: IUser): Promise<void> {
        //Not working properly need to fix this 
        const Entries : any = Object.keys(user)
        const Updates : any = {}

        // constructing dynamic query

        for (let i = 0; i < Entries.length; i++) {
            Updates[Entries[i]] = Object.values(user)[i]
        }
        console.log(Updates)

        const result = await userSchema.updateOne({_id:user.id},{$set:{name:user.name,email:user.email}});
        console.log(result);
        return {} as any;
    }

    public async delete(email:string): Promise<void> {
        const result = await userSchema.deleteOne({email:email});
        console.log(result);
        return {} as any;
    }

    public async login(user : IUser) : Promise<IUser>{
        const result = await userSchema.create(user);
        console.log(result);
        return {} as any;
    }

    public async register(user: IUser): Promise<void> {
        bcrypt.genSalt(10,(err,salt)=> 
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) throw err;
            // set password to hashed 
            user.password = hash;
            console.log(hash);
            console.log(user);
            userSchema.create(user).then(result=>{
                console.log(result);
                return result;
            })

            
        }))
        
    }
}

export default UserDao;
