
$(function(){
    //USER BET DATA
    //var csv = "Timestamp,Namn:,Match 1: Österrike- Nordirland,Match 2: England - Norge,Match 3: Danmark - Finland,Match 4: Tyskland - Spanien,Match 5: Sverige - Schweiz,Match 6: Nederländerna - Portugal,Match 7: Italien - Island,Match 8: Frankrike - Belgien,Match 9: Nordirland - England,Match 10: Österrike - Norge,Match 11: Finland - Tyskland,Match 12: Danmark - Spanien,Match 13: Schweiz - Nederländerna,Match 14: Sverige - Portugal,Match 15: Island - Frankrike,Match 16: Italien - Belgien,Vem vinner hela EM? Om du gissar rätt i denna omgång får du 3 poäng\n7/11/2022 10:17:38,Johan,2,2,1,1,1,X,2,1,2,2,2,1,X,1,2,X,Norge\n7/11/2022 10:32:09,Ellen,1,X,1,X,1,1,X,1,2,2,2,X,X,1,2,2,Sverige\n7/11/2022 11:48:32,Matilda ,X,2,1,1,1,X,X,2,2,2,2,X,2,1,X,X,SVERIGE!!\n7/11/2022 13:04:53,Maria Ronnås,X,1,1,1,1,1,1,1,2,2,2,X,2,1,2,X,Sverige\n7/11/2022 13:08:17,Lars Ronnås,X,1,1,1,1,1,2,1,2,2,2,1,2,1,2,X,Sverige \n7/11/2022 18:39:45,Per,1,1,2,1,1,2,1,2,1,X,2,1,X,1,2,2,Sverige\n7/11/2022 19:30:05,Hanna the winne,1,2,1,X,2,1,2,1,2,2,2,X,2,1,1,1,Norge"
    var csv = "Namn:,Match 1: England - Österrike,Match 2: Norge - Nordirland,Match 3: Spanien - Finland,Match 4: Tyskland - Danmark,Match 5: Portugal - Schweiz,Match 6: Nederländerna - Sverige,Match 7: Belgien - Island,Match 8: Frankrike - Italien,Match 1: Österrike- Nordirland,Match 2: England - Norge,Match 3: Danmark - Finland,Match 4: Tyskland - Spanien,Match 5: Sverige - Schweiz,Match 6: Nederländerna - Portugal,Match 7: Italien - Island,Match 8: Frankrike - Belgien,Match 9: Nordirland - England,Match 10: Österrike - Norge,Match 11: Finland - Tyskland,Match 12: Danmark - Spanien,Match 13: Schweiz - Nederländerna,Match 14: Sverige - Portugal,Match 15: Island - Frankrike,Match 16: Italien - Belgien\nJohan,1,1,1,1,1,2,2,2,2,2,1,1,1,X,2,1,2,2,2,1,X,1,2,X\nEllen,X,1,1,X,2,2,X,1,1,X,1,X,1,1,X,1,2,2,2,X,X,1,2,2\nMatilda ,1,2,X,1,1,2,X,X,X,2,1,1,1,X,X,2,2,2,2,X,2,1,X,X\nMaria Ronnås,1,1,1,X,1,2,2,X,X,1,1,1,1,1,1,1,2,2,2,X,2,1,2,X\nLars Ronnås,1,1,1,1,1,1,1,1,X,1,1,1,1,1,2,1,2,2,2,1,2,1,2,X\nPer,NA,NA,NA,NA,NA,NA,NA,NA,1,1,2,1,1,2,1,2,1,X,2,1,X,1,2,2\nHanna the winne,NA,NA,NA,NA,NA,NA,NA,NA,1,2,1,X,2,1,2,1,2,2,2,X,2,1,1,1"
    var data = $.csv.toObjects(csv);
    console.log(data);
    //DISPLAY LIST OF USERS
    let s = ""
    for(let d of data){
        s+="<option value=''>"+d["Namn:"]+"</option>\n"
        
    }
    $("#user-select").html(s);
    



    var scoreboard = {};
    var resultList = [];
    var today = new Date();
    var endDate = (today.toISOString().substring(0,10));
    var settings = {
        "url": "https://v3.football.api-sports.io/fixtures",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "x-rapidapi-key": "1b1f27a54069f19f74a21a68192e24f6",
            "x-rapidapi-host": "v3.football.api-sports.io"
        },
        "data": {

            "league": "743",
            "season": "2021",
            "from": "2022-07-01",
            "to": endDate
        
        }
    };
  
    $.ajax(settings).done(function (response) {
        console.log(response.response);
        let s = "";
        for(r of response.response){
            matchResult = "X";
            if(r.fixture.status.short != "FT"){
                continue;
            }
            if(r.teams.home.winner){
                matchResult = "1";
            }else if(r.teams.away.winner){
                matchResult = "2";
            }
            resultList.push(matchResult);
            s += "<p>" + matchResult + "</p>";
        }
        console.log(resultList);
        //$("#results").html(s);
    });


    
    //DISPLAY USER BET LIST
    $("#user-select").change(function(){
        console.log("RESULT LIST");
        console.log(resultList);
        var selectedName = $("#user-select option:selected").text();
        var betList = data.find(e => e["Namn:"] == selectedName);
        console.log(betList);

        var s = "";
        var index = 0;
        var roundIndex = 1;
        for(key in betList){
            if(key.substring(0, 5) == "Match"){
                if(key.substring(0,8) == "Match 1:"){
                    s+= "<p> Omgång " + roundIndex+ "</p>";
                    roundIndex++;
                }
                let textColor = "black";
                if(index < resultList.length){
                    if(resultList[index] == betList[key]){
                        textColor = "green";
                    }else{
                        textColor = "red";
                    }
                }
                s += "<p style='color:" + textColor + "'>" + key + " : " + betList[key] + "</p>";
                index++;
            }
            
            
        }

        //s += "<p> Vinnare hela VM:" + betList["Vem vinner hela EM? Om du gissar rätt i denna omgång får du 3 poäng"] + "</p>";
        $("#betlist").html(s);

    });
   

}); 
