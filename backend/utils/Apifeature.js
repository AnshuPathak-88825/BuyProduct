class ApiFeature
{
    constructor(query,querystr)
    {
        this.query=query;
        this.querystr=querystr;
    }
    search()
    {
        const keyword=this.querystr.keyword?{name:{
            $regex:this.querystr.keyword,
            $options:"i",
        }}:{};
        this.query=this.query.find({...keyword});
        return this;
    }
    filter()
    {
        // copy value of querystr not passing referrence
        const queryCopy={...this.querystr};
        const removeField=["keyword","page","limit"];
        removeField.forEach((key)=> {delete queryCopy[key]});
        this.query=this.query.find({...queryCopy});
        return this;
    }

}
module.exports=ApiFeature;