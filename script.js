var students = [];

function add() {

    if (!validate()) {
        alert("Fill All The Fields")
        return;
    }
    var obj = {
        rno: +document.getElementById("rno-box").value,
        name: document.getElementById("nm-box").value,
        cls: document.getElementById("class-box").value,
        phy: +document.getElementById("phy-box").value,
        che: +document.getElementById("che-box").value,
        math: +document.getElementById("math-box").value,
        bio: +document.getElementById("bio-box").value
    }
    students.push(obj);
    localStorage.setItem("student-marks", JSON.stringify(students));
    showTable();
    clearFields();
}


function validate() {
    var rno = +document.getElementById("rno-box").value;
    var name = document.getElementById("nm-box").value;
    var cls = document.getElementById("class-box").value;
    var phy = +document.getElementById("phy-box").value;
    var che = +document.getElementById("che-box").value;
    var math = +document.getElementById("math-box").value;
    var bio = +document.getElementById("bio-box").value;
    return rno && name && cls && phy && che && math && bio;
}

function showTable() {
    let table = document.getElementById("tab");
    table.innerHTML = "";

    for (let index in students) {
        let student = students[index];

        var totalMarks = student.phy + student.che + student.math + student.bio;
        var per = totalMarks / 4;

        if (per >= 60) {
            var division = "First";
        } else if (per >= 50) {
            division = "Second";
        } else if (per >= 40) {
            division = "Third";
        } else if (per < 40) {
            division = "Fail";
        }



        let row = table.insertRow();
        row.insertCell(0).innerText = student.rno;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.cls;
        row.insertCell(3).innerText = student.phy;
        row.insertCell(4).innerText = student.che;
        row.insertCell(5).innerText = student.math;
        row.insertCell(6).innerText = student.bio;
        row.insertCell(7).innerText = totalMarks;
        row.insertCell(8).innerText = per;
        row.insertCell(9).innerText = division;


        let actionBtn = row.insertCell(10);
        actionBtn.innerHTML = ` <button class="btn btn-outline-warning btn-sm" onclick="edit(${index})">Edit</button>
            <button class="btn btn-outline-danger btn-sm mt-1" onclick="deleteData(${index})">Delete</button>`;

    }
}

 function edit(index) {
    let student = students[index];

    document.getElementById("rno-box").value = student.rno;
    document.getElementById("nm-box").value = student.name;
    document.getElementById("class-box").value = student.cls
    document.getElementById("phy-box").value = student.phy;
    document.getElementById("che-box").value = student.che;
    document.getElementById("math-box").value = student.math;
    document.getElementById("bio-box").value = student.bio;

    deleteData(index);
}

 function deleteData(index) {
    students.splice(index, 1);
    localStorage.setItem("student-marks", JSON.stringify(students));
    showTable();
}

function clearFields() {
    document.getElementById("rno-box").value = "";
    document.getElementById("nm-box").value = "";
    document.getElementById("class-box").value = "";
    document.getElementById("phy-box").value = "";
    document.getElementById("che-box").value = "";
    document.getElementById("math-box").value = "";
    document.getElementById("bio-box").value = "";
}
clearFields()

window.onload = function () {
 
    var storedData = localStorage.getItem("student-marks");
    if (storedData) {
        students = JSON.parse(storedData);
        showTable();
    }
}