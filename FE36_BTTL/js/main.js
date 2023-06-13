'use strict';
var arrSinhvien = [];
var inputUpdate = -1;

//function common :
var getElement = function (selector) {
    return document.querySelector(selector);
}

var SinhVien = function (namePr, agePr, classPr, sexPr) {
    this.name = namePr;
    this.age = agePr;
    this.className = classPr;
    this.sex = sexPr;
}

function showDataToTable(arr) {
    var html = '';
    if (arr.length > 0) {
        arr.forEach((studentInfor, index) => {
            html += `<tr ondblclick="updateFieldName(this,${index})">
                    <td>${index + 1}</td>
                    <td>${studentInfor.name}</td>
                    <td>${studentInfor.age}</td>
                    <td>${studentInfor.sex}</td>
                    <td>${studentInfor.className}</td>
                    <td><button onclick="confirmDeleteRow(this, ${index})">xoa</button></td>
                </tr>`;
        })
    }
    else {
        html = "<tr> <td colspan='6'>No data</td></tr>";
    }
    getElement('#tblInforSV tbody').innerHTML = html;
}

//Chức năng delete thông tin row trên table
function confirmDeleteRow(btn, index) {
    var flagConfirm = confirm("ban co muon xoa hang khong?");
    if (flagConfirm) {
        deleteRow(btn, index);
    }
}

function deleteRow(button, index) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    arrSinhvien.splice((index - 1), 1);
}
//Chức năng delete thông tin row trên table - end

//Chức năng update thông tin trên table
var updateFieldName = function (tr, index) {
    tr.querySelectorAll('td')[1].innerHTML = '<input type="text" name="nameStudent" onkeyup="processEventEnter(event)">'
    inputUpdate = index;
}

var processEventEnter = function (en) {
    if (en.which == 13) {
        var txtInput = en.target.value;
        var td = en.target.parentNode;
        td.innerHTML = txtInput;
        arrSinhvien[inputUpdate].name = txtInput;
    }
}

var hideElement = function() {
    getElement('.content_suggest ul').innerHTML = '';
    getElement('.content_suggest').classList.add('hide_element');
}
//Chức năng update thông tin trên table - end

window.onload = function () {

    //Xem thử có bnhiu event : 1 button submit
    document.querySelector('#formData').addEventListener('submit', function (e) {
        e.preventDefault();
        //Lấy tất cả thông tin từ form
        var txtName = getElement('#txtName').value;
        var txtAge = getElement('#txtAge').value;
        var cbbClass = getElement('#cbbClass').value;
        var txtSex = getElement('input[name="txtSex"]:checked').value;

        //Hiển thị ra màn hình
        var studentInfor = new SinhVien(txtName, txtAge, cbbClass, txtSex);
        arrSinhvien.push(studentInfor);
        showDataToTable(arrSinhvien);
    });

    document.querySelector("#btnSearch").addEventListener("click", () => {

        var value_search = document.querySelector("#txtsearchvalue").value;

        if (value_search === "" || value_search === null) {
            alert("Vui lòng nhập tên sinh viên cần tìm");
            return;
        }
        //cách 1 : Search phần tử dùng loop for
        var searchEle = function () {
            var resultSearch = []
            for (let i = 0; i < arrSinhvien.length; i++) {
                var str = arrSinhvien[i].name;
                if (str.indexOf(value_search) > -1) {
                    resultSearch.push(arrSinhvien[i]);
                }
            }
            return resultSearch;
        }
        // var result = searchEle();

        //cách 2 : Search phần tử dùng method trong array
        var result = arrSinhvien.filter(function (data) {
            return data.name.indexOf(value_search) > -1;
        })
        showDataToTable(result);
    });

    document.querySelector('#txtsearchvalue').addEventListener('keyup', function (e) {
        var txtInput = e.currentTarget.value;
        if (txtInput == '') {
            hideElement();
            return;
        }
        var result = arrSinhvien.filter(function (data) {
            return data.name.indexOf(txtInput) > -1;
        });

        if (result.length > 0) {
            getElement('.content_suggest').classList.remove('hide_element');
            var html = '';
            result.forEach((studentInfor) => {
                html += `<li><span>${studentInfor.name}</span></li>`;
            })
            getElement('.content_suggest ul').innerHTML = html;
        } else {
            hideElement();
        }
    })

    document.querySelector('#txtsearchvalue').addEventListener('blur', function (e) {
        hideElement();
    });
}