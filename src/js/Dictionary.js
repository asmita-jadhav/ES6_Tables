
class Dictionary {
    constructor() {      
      this.items=[];
    }  
  
    setData(items){
      
      /*for(let item in items){
        this.items.fill({key:item.id,value:item.title});
      }*/

      items.forEach(item => {
          this.items.push({key:item.id,value:item.title});
      });

    }

    push(item){
      this.items.push({
        key:item.key,
        value:item.value
      });

    }

    /*async load(url) {
      try{
        
        const response=await fetch(url);
        let data=await response.json();

        this.setData(data);

        return this.items;
        
      }
      catch(err){
        console.log(err);
      }
    }*/

    
  
    find(query) {
      var entry = this.items.find(e => e.word == query);
      return entry && entry.translation;
    }

    count(){
      return this.items.length;
    }

    getData(){
      return this.items;
    }
    deleteItem(item){
      this.items.splice(item,1);
    }
  }
  
  
  export default Dictionary;