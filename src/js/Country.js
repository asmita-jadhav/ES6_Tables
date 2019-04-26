let countries = ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Irland', 'Luxembourg'];

import Dictionary from './Dictionary';
import '../scss/index.scss';
import template from '../templates/template';
import one from '../images/1.jpg';

class Country{

    constructor(){
        
        this.countries=new Dictionary();        
        this.el = document.getElementById('countries');

        //document.getElementById('spiner').style.display='block';


        this.loadData('https://jsonplaceholder.typicode.com/todos')               
        .then(result=>{
            this.countries.setData(result);
            this.render();
            this.setEvent();
        })
        .catch(err=>{
            this.message=err;
            
        });   ///put template literals;
       document.getElementById('alertMessage').innerHTML=template;

        let temp=document.getElementById("imageone");
        
        temp.src=one;

        
    }
       
    async loadData(url){

        let response=await fetch(url);
        let countries=await response.json();
        console.log(countries);
        return countries;
    }

    setEvent(){
        
        var self=this;

        document.querySelector('.btn-add-item').addEventListener('click', this.addCountry.bind(this));
        document.querySelector('.btn-update-item').addEventListener('click', this.updateCountry.bind(this));
    
        document.addEventListener('click', event => {
        if (!event.target) {
            return;
            }

            if (event.target.classList.contains('btn-delete-item')) {
                self.Delete(event);
            }
        
            if (event.target.classList.contains('btn-edit-item')) {
                self.Edit(event);
            }
        });

    }
    
    render(){
        var data = '';
        this.count();  
        let items=this.countries.getData();      
        for(let country of items){
                data += '<tr>';
                data += '<td>' + country.key + '</td>';
                data += '<td>' + country.value + '</td>';                
                data += '<td><button class="btn btn-warning btn-edit-item" data-id='+(country.key-1)+'><span class="fa fa-pencil"></span></button></td>';
                data += '<td><button class="btn btn-danger btn-delete-item" data-id='+(country.key-1)+'><span class="fa fa-close"></span></button></td>';
                data += '</tr>';
        }                              
        return this.el.innerHTML = data;
    }

    count(){
        this.counter = document.getElementById('counter');
        this.counter.innerHTML=this.countries.count()+" countries";
    }
    
    addCountry(){
        var self=this;

        var el = document.getElementById('add-name');
        // Get the value
        
        let newItemkey=self.countries.count() + 1 ;

        var country = el.value;

        if (country) {
            // Add the new value
            this.countries.push({key:newItemkey,value:country.trim()});
            // Reset input value
            el.value = '';
            document.getElementById('alertMessage').innerHTML=template({
                avoid: 'var',
                who: 'puppy'
              });
            // Dislay the new list
            self.render();
        }
    }

    Edit(e){
        var el=document.getElementById("edit-name");        
        var item=e.target.getAttribute('data-id');
        el.setAttribute("data-id",item);
        el.value=this.countries[item].value;
        document.getElementById('spoiler').style.display = 'block';        
    }
    updateCountry(){
        var self = this;
        var el=document.getElementById("edit-name");
        var country = el.value;
        var item=el.getAttribute('data-id');
        if (country) {
            // Edit value
            self.countries.splice(item, 1, {key:item+1,value:country.trim()});
            // Display the new list
            self.render();
            // Hide fields
            self.closeInput();
        }
    }

    closeInput() {
        document.getElementById('spoiler').style.display = 'none';
    }

    Delete(e){
         var item=e.target.getAttribute('data-id');

        this.countries.deleteItem(item);
        // Display the new list
        this.render();
    }
    

}

export default Country;