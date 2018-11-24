$(function() {
    $(".change-status").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");
        console.log(id, newDevoured);

        var newState = {
            devoured: newDevoured
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newState
        }).then(function() {
            console.log("Changed burger state to ", newState);
            location.reload();
        });
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        console.log("\nFrontend data, burger name: " + $("#burger_name").val().trim());
        
        var newBurger = {
            name: $("#burger_name").val().trim(),
            devoured: 0
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