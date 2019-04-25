let countries = ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Irland', 'Luxembourg'];

import Dictionary from './Dictionary';

class Country{

    constructor(){
        
        this.countries=[];
        this.message='';
        this.el = document.getElementById('countries');

        document.getElementById('spiner').style.display='block';
        let dataPromise=new Dictionary();
        dataPromise.load('https://jsonplaceholder.typicode.com/todos').then(data => {
            this.countries=data;
                   
            this.render();
            document.getElementById('spiner').style.display='none';

            this.setEvent();
        
        });                   
               
        /*}else{
            this.message=`Countries count is ${ this.countries.length }`;
            document.getElementById("alertMessage").innerHTML=this.message;
        }*/
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
        if (this.countries.length > 0) {
            for (let i = 0; i < this.countries.length; i++) {
                data += '<tr>';
                data += '<td>' + this.countries[i].key + '</td>';
                data += '<td>' + this.countries[i].value + '</td>';                
                data += '<td><button class="btn btn-warning btn-edit-item" data-id='+(this.countries[i].key-1)+'><span class="fa fa-pencil"></span></button></td>';
                data += '<td><button class="btn btn-danger btn-delete-item" data-id='+(this.countries[i].key-1)+'><span class="fa fa-close"></span></button></td>';
                data += '</tr>';
            }
        }                        
        return this.el.innerHTML = data;
    }

    count(){
        this.counter = document.getElementById('counter');
        this.counter.innerHTML=this.countries.length+" countries";
    }
    
    addCountry(){
        var self=this;

        var el = document.getElementById('add-name');
        // Get the value
        let countCountry=self.countries.length;
        let newItemkey=(self.countries[countCountry-1].key + 1 );

        var country = el.value;

        if (country) {
            // Add the new value
            this.countries.push({key:newItemkey,value:country.trim()});
            // Reset input value
            el.value = '';
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

        this.countries.splice(item, 1);
        // Display the new list
        this.render();
    }
    

}

export default Country;