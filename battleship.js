/**
 * Created by Rajesh on 6/22/2017.
 */
var count = 0;
var score = [];
var position =[];
var thresholdPosition = 0;
var data = {};
var table, x;
$("#submit").on('click', function() {
    if(formValidate()){
        $("#battleship").hide();
        data =getData();
        var tableNew = createTable(data.rows, data.columns);
        document.getElementById('welcome').innerHTML ='Welcome '+data.name+'.Lets try to sabotage '+data.opponent+"'s ship!!";
        document.getElementById('container').innerHTML = tableNew;
    }
});

$("#replay").on('click', function () {
        count = 0;
        score = [];
        position =[];
        thresholdPosition = 0;
        table = '';
        x = 0;
        $("#container").css('display', 'block').innerHTML = '';
        document.getElementById('welcome').innerHTML = 'Welcome again ' + data.name + '.Lets try to sabotage ' + data.opponent + "'s ship!!";
        console.log(createTable(data.rows, data.columns));
        $("#container").html(createTable(data.rows, data.columns));
        $("#showResult").hide();
        $("#replayMessage").hide();
    });

function createTable(rows, columns){
    table = "<table class='table table-bordered'>";
    thresholdPosition = 0.25*(rows*columns);
    for(var i=0; i< rows;i++){
        table += "<tr>";
        for(var j =0 ; j < columns; j++){
            if(position.length < thresholdPosition){
                addPosition(i, j);
            }
            table += `<td id="col-${i}-${j}" class="image" onclick="handleClick(${i}, ${j})" ></td>`;
        }
        table += '</tr>'
    }
    table += '</table>';
    return table;
}

function addPosition(i , j) {
    x = parseInt(Math.random()*10);
    if(x < 3){
        position.push({i: i, j: j});
    }
}

function handleClick(i, j) {
        if(count<3){
            var hit =0;
            var index = _.findIndex(position, function (o) {
            return o.i === i && o.j === j;
        });
            $(".message").css("display","block");
        if (index >= 0) {
        document.getElementById('message').innerHTML= 'You thrashed the ship.';
            var thrashedColumn = document.getElementById("col-"+i+'-'+j);
            thrashedColumn.style.textAlign = "center";
            thrashedColumn.innerHTML = '<img src="blast.png" class="animated fadeOutUp blast"/>';
            setTimeout(function(){
                $('#col-'+i+'-'+j).html('');
            }, 2000);
            hit=1;
        }else {
            document.getElementById('message').innerHTML = 'You missed. The game is still on. Lets try again!';
        }
        setTimeout(function(){
            document.getElementById('message').innerHTML= '';
            $(".message").css("display","none" +
                "");
        }, 1000);
        score.push(hit);
        count++;
            if(count === 3) {
                showResult();
            }
       }
    }

function getData(){
    var name = $("#yourName").val();
    var opponent = $("#opponentName").val();
    var rows = $("#rows").val();
    var columns = $("#columns").val();

    return{
        name: name,
        opponent: opponent,
        rows: rows,
        columns: columns,
    }
}

function formValidate(){
    var data =getData();
    var flag = 0;
    if(data.name.length < 3) {
        text = 'Please enter a valid name';
        document.getElementById('nameErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(!isNaN(data.name)){
        text = 'Please enter a valid name and not number';
        document.getElementById('nameErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(data.opponent < 3) {
        text = 'Please enter a valid opponent name';
        document.getElementById('opponentNameErrorMessage').innerHTML= text;
        flag = 1;
    }

    if(!isNaN(data.opponent)){
        text = 'Please enter a valid opponent name and not number';
        document.getElementById('opponentNameErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(parseInt(data.rows) >= 10){
        text = 'Entered row could be in 10*10 matrix. Please enter a valid row number';
        document.getElementById('rowsErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(isNaN(data.rows)){
        text = 'Only numeric value is accepted';
        document.getElementById('rowsErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(parseInt(data.columns) >= 10){
        text = 'Entered column could be in 10*10 matrix. Please enter a valid column number';
        document.getElementById('columnsErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(isNaN(data.columns)){
        text = 'Only numeric value is accepted';
        document.getElementById('columnsErrorMessage').innerHTML = text;
        flag = 1;
    }

    if(flag===1){
        return false;
    }else{
        return (true);
    }
}

function showResult(){
    $(".result").css("display","block");
    document.getElementById('showResult').innerHTML='You scored: '+score;
    $("#replayMessage").css("display","block");
    $("#container").hide();
}

