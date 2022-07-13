


$(function(){

    var csv = "Timestamp,Namn:,Match 1: Österrike- Nordirland,Match 2: England - Norge,Match 3: Danmark - Finland,Match 4: Tyskland - Spanien,Match 5: Sverige - Schweiz,Match 6: Nederländerna - Portugal,Match 7: Italien - Island,Match 8: Frankrike - Belgien,Match 9: Nordirland - England,Match 10: Österrike - Norge,Match 11: Finland - Tyskland,Match 12: Danmark - Spanien,Match 13: Schweiz - Nederländerna,Match 14: Sverige - Portugal,Match 15: Island - Frankrike,Match 16: Italien - Belgien,Vem vinner hela EM? Om du gissar rätt i denna omgång får du 3 poäng\n7/11/2022 10:17:38,Johan,2,2,1,1,1,X,2,1,2,2,2,1,X,1,2,X,Norge\n7/11/2022 10:32:09,Ellen,1,X,1,X,1,1,X,1,2,2,2,X,X,1,2,2,Sverige\n7/11/2022 11:48:32,Matilda ,X,2,1,1,1,X,X,2,2,2,2,X,2,1,X,X,SVERIGE!!\n7/11/2022 13:04:53,Maria Ronnås,X,1,1,1,1,1,1,1,2,2,2,X,2,1,2,X,Sverige\n7/11/2022 13:08:17,Lars Ronnås,X,1,1,1,1,1,2,1,2,2,2,1,2,1,2,X,Sverige \n7/11/2022 18:39:45,Per,1,1,2,1,1,2,1,2,1,X,2,1,X,1,2,2,Sverige\n7/11/2022 19:30:05,Hanna the winne,1,2,1,X,2,1,2,1,2,2,2,X,2,1,1,1,Norge"

    var data = $.csv.toObjects(csv);


    console.log(data);  
    // jQuery methods go here...
    console.log(data[0]);
    let s = ""
    for(let d of data){
        s+="<option value='volvo'>"+d["Namn:"]+"</option>\n"
        
    }
    $("#user-select").html(s);
    


    $("#user-select").change(function(){
        var selectedName = $("#user-select option:selected").text();
        var betList = data.find(e => e["Namn:"] == selectedName);
        console.log(betList);

        var s = "";
        for(key in betList){
            if(key.substring(0, 5) == "Match"){
                s += "<p>" + key + " : " + betList[key] + "</p>";
            }
            
        }

        s += "<p> Vinnare hela VM:" + betList["Vem vinner hela EM? Om du gissar rätt i denna omgång får du 3 poäng"] + "</p>";
        $("p").html(s);

    });

}); 
