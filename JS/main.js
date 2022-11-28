let usersArr=[];
let index;

if(localStorage.getItem("users")!=null)
{
    usersArr=JSON.parse(localStorage.getItem("users"));
    display()
    
}

//Create
function add(){
    if(ageValidation()==true && ValidateEmail()==true){

    
    let user={
        userName: $("#name").val() ,
        userAge: $("#age").val(),
        userJob: $("#job").val(),
        userMail:$("#email").val(),
    }

    usersArr.push(user)
    localStorage.setItem("users",JSON.stringify(usersArr))
    display()
    }
}
// display
function display(){
    let temp="";
    usersArr.forEach((element,i )=> {
        temp+=`<tr>
        <td>${i+1}</td>
        <td>${element.userName}</td>
        <td>${element.userAge}</td>
        <td>${element.userJob}</td>
        <td>${element.userMail}</td>
        <td>
             
            <a class="btn btn-dark" id="update" href="#" onclick="update(`+i+`)"><i class="fa fa-edit"></i></a>
            <a class="btn btn-dark" id="delete" href="#" onclick="deleteUser(`+i+`)"><i class="fa fa-trash"></i></a>
            
        </td>
    </tr>`
        
    });
    $("#tb").html(temp);

}


//delete
function deleteUser(x){

    usersArr.splice(x,1)
    localStorage.setItem("users",JSON.stringify(usersArr))
    display()
}

// update

function update(x){
    index=x
    $("#name").val(usersArr[x].userName); 
    $("#age").val(usersArr[x].userAge);
    $("#job").val(usersArr[x].userJob);
    $("#email").val(usersArr[x].userMail);
    $("#edit").css("display","inline-block");
    $("#add").css("display","none");

}

function edit(){
    usersArr[index].userName=$("#name").val();
    usersArr[index].userAge=$("#age").val();
    usersArr[index].userJob=$("#job").val();
    usersArr[index].userMail=$("#email").val();
    localStorage.setItem("users",JSON.stringify(usersArr))
    display();
    clearFrom();

}
// clear inputs value

function clearFrom(){
    $("#name").val(""); 
    $("#age").val("");
    $("#job").val("");
    $("#email").val("");
}

function search(){
   let searchValue= $("#search").val()
   let temp=""
   usersArr.forEach((element,i) => {
    
   
   if( element.userName.toLowerCase().includes(searchValue.toLowerCase())|| element.userJob.toLowerCase().includes(searchValue.toLowerCase()) ||element.userMail.toLowerCase().includes(searchValue.toLowerCase()) ){
        temp+=`<tr>
        <td>${i+1}</td>
        <td>${element.userName}</td>
        <td>${element.userAge}</td>
        <td>${element.userJob}</td>
        <td>${element.userMail}</td>
        <td>
             
            <a  class="btn btn-dark" id="update" href="#" onclick="update(`+i+`)"><i class="fa fa-edit"></i></a>
            <a  class="btn btn-dark" id="delete" href="#" onclick="deleteUser(`+i+`)"><i class="fa fa-trash"></i></a>
            
        </td>
    </tr>`
   }
    });
    $("#tb").html(temp);

}
function ExportToExcel(type, fn, dl) {
    let table = document.getElementById('table');
    let workBook = XLSX.utils.table_to_book(table, { sheet: "sheet1" });
    return dl ?
      XLSX.write(workBook, { bookType: type, bookSST: true, type: 'base64' }):
      XLSX.writeFile(workBook, fn || ('DataList.' + (type || 'xlsx')));
 }



 function ageValidation(){
    let regAge = /^(1[89]|[2-9]\d)$/gm
    let age = $('#age').val();
    if(regAge.test(age))
    { 
        document.getElementById("notvalid").style.display="none"
        $("#age").addClass("is-valid")
        $("#age").removeClass("is-invalid")
        return true
    
        }
    else
    {
        document.getElementById("notvalid").style.display="block"
        $("#age").addClass("is-invalid")
        $("#age").removeClass("is-valid")
        
    }
     }

     function ValidateEmail() 
    {
        let regMail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let mail=$('#email').val();
        {
            if (regMail.test(mail))
        {
            document.getElementById("invalidmail").style.display="none"
            $("#email").addClass("is-valid")
            $("#email").removeClass("is-invalid")
        
           return true
        }
        else
        {
        document.getElementById("invalidmail").style.display="block"
        $("#email").removeClass("is-valid")
        $("#email").addClass("is-invalid")
            
            return false
        }
    }
}
    
$('#age').blur(function(){
    ageValidation();
 })
 $('#email').blur(function(){
    ValidateEmail();
 })

 $("#excel").click(function(){
    ExportToExcel('xlsx');
 })
 $("#reload").click(function(){
    location.reload();
  
 })
$("#search").keyup(function(){
    search();
})
$("#add").click(function(){
    add()
})
$("#clear").click(function(){
    clearFrom();
})

