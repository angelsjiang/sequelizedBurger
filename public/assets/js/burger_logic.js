$(document).ready(function() {

    var list = [];

    function initializeData() {
        $("#not-eaten").empty();
        $("#eaten").empty();

        var eatenList = [];
        var notEatenList = [];

        for(var i = 0; i < list.length; i++) {
            console.log(list[0].devoured);
            if(list[i].devoured === true) {
                eatenList.push(createNewRow(list[i]));
                console.log(eatenList);
            }
            else {
                notEatenList.push(createNewRow(list[i]));
                console.log(notEatenList);
            }
        }

        // console.log("list of eaten burgers ", eatenList);
        // console.log("list of not eaten burgers ", notEatenList);

        $("#not-eaten").append(notEatenList);
        $("#eaten").append(eatenList);
    };

    function createNewRow(item) {
        console.log(item.devoured, " this is devoured");

        if(item.devoured === false) {
            var $newInput = $(
                [
                    "<li>",
                    "<span>",
                    item.burger_name,
                    "</span>",
                    " <button class='change-status'>Eat it!</button>",
                    "</li>"
                ].join("")
            );
    
            $newInput.find("button.change-status").data("id", item.id);
            $newInput.find("button.change-status").data("devoured", item.devoured);
            return $newInput;
        }
        else {
            var $newInput = $(
                [
                    "<li>",
                    "<span>",
                    item.burger_name,
                    "</span>",
                    "</li>"
                ].join("")
            );
            return $newInput;
        }

    };

    function getData() {
        $.get("/api/burgers", function(data) {
            list = data;
            initializeData();
        });
    };

    getData();


    $(document).on("click",".change-status", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var newDevoured = $(this).data("devoured");
        console.log(id, newDevoured);

        var newState = {
            devoured: true
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newState
        }).then(function(result) {
            console.log("Changed burger state to ", newState, result);
            location.reload();
        });
    });

    $(document).on("submit", ".create-form", function(event) {
        event.preventDefault();

        console.log("\nFrontend data, burger name: " + $("#burger_name").val().trim());
        
        var newBurger = {
            burger_name: $("#burger_name").val().trim(),
            devoured: false
        }

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("New burger added!", newBurger);
            location.reload();
        });
    });
});