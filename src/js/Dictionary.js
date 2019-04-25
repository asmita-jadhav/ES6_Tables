
class Dictionary {
    constructor(items) {      
      this.items=[];
    }  
  
    setData(items){

      //this.items=items.map((item)=>({key:item.id,value:item.title}));
      items.forEach(item => {
          this.items.push({key:item.id,value:item.title});
      });

    }

    async load(url) {
      try{
        
        const response=await fetch(url);
        let data=await response.json();

        this.setData(data);
        
        return this.items;
        
      }
      catch(err){
        console.log(err);
      }
    }
  
    find(query) {
      var entry = this.items.find(e => e.word == query);
      return entry && entry.translation;
    }

    count(items){
      return this.items.length;
    }
  }
  
  
  export default Dictionary;