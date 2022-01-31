




window.addEventListener("load",function(){
    var app = new Vue({
        el:"#vuemain",
        data:
        {
         employees:[],
         tasks:[],
         ram:null,
        date: "",
         curemployee:null,
         starttime:"",
         endTime:"",
         endtime:"",
         starTime:"",
         showsch:false,

         sec:"22,clean the rrom, 22:12:00, 22:33:44"


        },
        methods:
        {




				task:function(){
		//console.log("dsaasda");
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

            app.employees = JSON.parse(xhttp.responseText);


            }
        };
        xhttp.open("GET", "/task", true);

        xhttp.send();

		// in success handler redirect to employee.html

	},
		taskadd:function(employee_id){
		//console.log("dsaasda");
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("good");
                app.tasks=JSON.parse(xhttp.responseText);

            }
        };
        xhttp.open("POST", "/taskadd", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({Task_id: document.getElementById('Task_id').value,Description: document.getElementById('Description').value, Employee_id:employee_id}));

		// in success handler redirect to employee.html

	},
		taskdelete:function(){
		//console.log("dsaasda");
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("good");
                console.log(this.responseText);

            }
        };
        xhttp.open("POST", "/taskdelete", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({Task_id: document.getElementById('Task_id').value,Description: document.getElementById('Description').value}));

		// in success handler redirect to employee.html

	},
		st:function(employee_id){
		//console.log("dsaasda");
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                console.log(this.responseText);
                app.starttime=JSON.parse(xhttp.responseText);

            }
        };
        xhttp.open("POST", "/starttime", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({time: document.getElementById('meeting-time').value,Employee_id: employee_id}));

		// in success handler redirect to employee.html

	},
			end:function(employee_id){
		//console.log("dsaasda");
		// http call
		var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("good");
                app.endTime=JSON.parse(xhttp.responseText);
                console.log(this.responseText);

            }
        };
        xhttp.open("POST", "/endtime", true);
        xhttp.setRequestHeader("Content-type", "application/json");
         console.log(this.responseText);
        xhttp.send(JSON.stringify({endtime: document.getElementById('end-time').value,Employee_id: employee_id}));
         console.log(this.responseText);

		// in success handler redirect to employee.html

	},






    }
    });


});


