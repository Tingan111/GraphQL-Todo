const Todo=require('./models/Todo');

const resolvers={
    Query:{
        todos:async ()=>await Todo.find(),
    },
    Mutation:{
        addTodo: async(_, {title})=>{
            const todo=new Todo({ title,completed:false});
            return await todo.save();
        },
        toggleTodo: async(_,{id})=>{
            const todo=await Todo.findById(id);
            todo.completed=!todo.completed;
            return await todo.save();
        },
        deleteTodo: async(_,{id})=>{
            await Todo.findByIdAndDelete(id);
            return true;
        },

    },
};

module.exports=resolvers;