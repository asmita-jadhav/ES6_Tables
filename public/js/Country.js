let countries = ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Irland', 'Luxembourg'];

import CountingDictionary from './CountingDictionary';

class Country {

    constructor() {

        let self = this;
        this.countries == [];
        this.message = '';

        let temp = CountingDictionary.load('https://jsonplaceholder.typicode.com/todos');
        this.countries = temp.then(temp => {
            temp.json;
        });

        //this.setData();

        if (this.countries != undefined || this.countries != null) {
            this.el = document.getElementById('countries');
            this.fetchAll();

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
        } else {
            this.message = `Countries count is ${this.countries.length}`;
            document.getElementById("alertMessage").innerHTML = this.message;
        }
    }

    setData() {

        fetch('https://jsonplaceholder.typicode.com/todos').then(response => {
            if (response.status == 200) {
                response.json().then(data => {
                    this.countries = data;
                });
                console.log(response);
            }
        }).catch(error => console.error('Error:', error));

        /*var data=[];
        const URL = `https://jsonplaceholder.typicode.com/todos`;
        const fetchResult = fetch(URL)
        const response = await fetchResult;
        const jsonData = await response.json();
        console.log(jsonData);
          jsonData.map(item => { data.push(item.title);*/
    }

    fetchAll() {
        var data = '';
        this.count();
        var self = this;
        if (this.countries.length > 0) {
            for (let i = 0; i < this.countries.length; i++) {
                data += '<tr>';
                data += '<td>' + this.countries[i] + '</td>';
                data += '<td><button class="btn-edit-item" data-id=' + i + '>Edit</button></td>';
                data += '<td><button class="btn-delete-item" data-id=' + i + '>Delete</button></td>';
                data += '</tr>';
            }
        }
        return this.el.innerHTML = data;
    }

    count() {
        this.counter = document.getElementById('counter');
        this.counter.innerHTML = this.countries.length + " countries";
    }

    addCountry() {
        var self = this;

        var el = document.getElementById('add-name');
        // Get the value
        var country = el.value;

        if (country) {
            // Add the new value
            this.countries.push(country.trim());
            // Reset input value
            el.value = '';
            // Dislay the new list
            self.fetchAll();
        }
    }

    Edit(e) {
        var el = document.getElementById("edit-name");
        var item = e.target.getAttribute('data-id');
        el.setAttribute("data-id", item);
        el.value = this.countries[item];
        document.getElementById('spoiler').style.display = 'block';
    }
    updateCountry() {
        var self = this;
        var el = document.getElementById("edit-name");
        var country = el.value;
        var item = el.getAttribute('data-id');
        if (country) {
            // Edit value
            self.countries.splice(item, 1, country.trim());
            // Display the new list
            self.fetchAll();
            // Hide fields
            self.CloseInput();
        }
    }

    closeInput() {
        document.getElementById('spoiler').style.display = 'none';
    }

    Delete(e) {
        var item = e.target.getAttribute('data-id');

        this.countries.splice(item, 1);
        // Display the new list
        this.fetchAll();
    }

}

export default Country;