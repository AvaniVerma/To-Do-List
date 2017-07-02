var arr;

function load()							//Reads from local storage into array called arr
{
    var x=localStorage.getItem("todolist");
    if(x==null)
        arr=[];
    else arr=JSON.parse(x);
    print();
};


//Prints the array arr
function print()
{

    list.innerHTML="";
    for( i=0; i<arr.length; i++)
    {

        if(arr[i].status=="true")
        {
            list.innerHTML += ('<div class="card  hoverable myCardClass" style=" margin:1% ;"   >' +
            '<div class="card-action  cardTitle" style="  width: 100%;  background-color: #ccc9cb;" >' +
            '</div>' +   '<div class="card-content"  style="overflow: auto">' +
            '<p>' + '<input type="checkbox"   onclick="update(this)" checked="checked"     '
            + 'id=' + i + ' >' + '<label   ' + '  for=' + i + '>' + arr[i].Task + '</label>' + '</p>' +
            '</div>')

        }
        else {
            var color;
            //Assign color to bar according to their priority
            if(arr[i].Priority==="Low") color="low.jpg";
            else if(arr[i].Priority==="Important")  color="important.jpg";
            else color="urgent.jpg";


            list.innerHTML += ('<div class="card  hoverable myCardClass"  style="  margin: 1%;" >' +
            '<div class="card-action  cardTitle" style=" width: 100%; background-image: url('+color+')  " >' +
            '</div>' + '<div class="card-content" style="overflow: auto">' +
            '<p>' + '<input type="checkbox"   onclick="update(this)" ' + 'id='
            + i + ' >' + '<label   style="color: black" ' + '  for=' + i + '>' + arr[i].Task + '</label>' + '</p>' +
            '</div>')
        }
    }
};


window.onload=function()
{
	var taskValue= document.getElementById('newtask');
	var add=document.getElementById('addButton');
	var list=document.getElementById('list');
	var selectMenu=document.getElementById('selectMenu');

	load();

	add.onclick=function()		//Adds a new task to local storage and calls load to update the screen
	{
		var task=taskValue.value;
		newtask.style.color="black";
		var priority=selectMenu.value;

		if(!task.trim() || priority==="") return;		//Do nothing if string is empty or has only whitespace or priority is not selected
		var newItem={
			"Task": task,
			"status":"false",
            "Priority":priority
		};

		arr.push(newItem);
		localStorage.setItem("todolist", JSON.stringify(arr));
		load();
        taskValue.value="";         // clears text field
     //   selectMenu.value="Low"; //??????????????????????????    Doubt : how to set to null without removing unselected attribute
	};



    //Deletes finished tasks....makes a new array from arr saving only the fnished tasks, saves the tasks in localstorage, calls load
	deleteTaskButton.onclick=function ()
	{
		var x=[];
		for( i in arr)
		{
			if(arr[i].status === "false")
				x.push(arr[i]);
		}

        localStorage.setItem("todolist", JSON.stringify(x));
        load();
    };


    //Function to sort the tasks according to their priority
	listByPriorityLink.onclick=function () {
	    var urgent=arr.filter(function (task)       //Filter urgent tasks in array called urgent
        {
            return task.Priority==="Urgent" && task.status=="false";
        });

        var important=arr.filter(function (task)        //Filter important tasks in array important
        {
            return task.Priority==="Important" && task.status=="false";
        });

        var low=arr.filter(function (task)          //Filter low priority tasks in low
        {
            return task.Priority==="Low" && task.status=="false";
        });

        arr=urgent.concat(important).concat(low);       //concatenate the three arrays and assign them to arr
        print();                    //print arr
    };

};



function update(item)	//when user marks a task as done, updates values in arr and stores arr in local storage
{
    var el=document.getElementById(item.id);
    if(arr[item.id].status=="true")
    	arr[item.id].status="false";
    else
    	arr[item.id].status="true";
    localStorage.setItem("todolist", JSON.stringify(arr));
    load();
};

