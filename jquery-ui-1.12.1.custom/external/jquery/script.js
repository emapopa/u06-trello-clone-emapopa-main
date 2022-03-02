
//funktion som ta bort en slide 

function productDelete(ctl) {
    $(ctl).parents(".ui-state-highlight").remove();
}


$(function () {
    function initSortable() {
        $(".column").sortable({
            connectWith: ".column",
            handle: ".header",
//                    cancel: ".header"
//                    placeholder: "portlet-placeholder ui-corner-all"
        });
        $("ul.droptrue").sortable({
            connectWith: "ul"
        });
        $("ul.dropfalse").sortable({
            connectWith: "ul",
//                    dropOnEmpty: false
        });
        $("#sortable1, #sortable2, #sortable3").disableSelection();
    }
    initSortable();
    $(".btn")
            .button()
            .click(function (event) {
                event.preventDefault();
            });
   

            //  funktion som legger till ett ny slide och kan man välja en tittle description, tid och prioritera det 
    function addOrder() {
        let valid = true;

        if (valid) {
            selectedList = $('#list').find(":selected").text();
            box = $('div').find("[data-title='" + selectedList + "']");
            boxList = box.find('ul');
            let taskTitle = "<span style = 'text-decoration: underline; font-weight: bold;'>Title</span>:";
            let task = $('#task').val()||"No task added"; // Default values
            let descriptionTitle = "<span style = 'text-decoration: underline; font-weight: bold;'>Description</span>:";
            let description = $('#description').val()||"No task description"; // Default values
            let dateTitle = "<span style = 'text-decoration: underline; font-weight: bold;'>Date</span>:";
            let date = $('#datepicker').val();
            let prioTitle = "<span style = 'text-decoration: underline; font-weight: bold;'>Date</span>:";
            let checkbox = $( ".radioSelect:checked" ).val();
            boxList.append("<li class=\"ui-state-highlight\">" + taskTitle + " " + task + "<br>" + descriptionTitle + " " + description + " <br> " + dateTitle + " " + date + " <br> " + prioTitle + " " + checkbox + " <br> " + "<button type='button' onclick='productDelete(this);' class='btn btn-default'>" + " Delete" +  "<span class='glyphicon glyphicon-remove' />" +"</li>");
            dialog.dialog("close");
        }
        return valid;
    }


    //själva diolog funktion, och efekt på öpen och close
    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 380,
        width: 350,
        modal: true,
        show: {
            effect: 'drop',
            duration: 1000,
            direction: 'up',
        },
        hide: {
            effect: 'drop',
            duration: 1000,
            direction: 'down',
        },
        buttons: {
            "Create new Task": addOrder,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        
        close: function () {
  //                    $("#dialog-form")[0].reset();
//                      allFields.removeClass("ui-state-error");
        }
    });
// custom wifgets

    $.widget("custom.tabsilainen", { 
        _create: function() {
            $( ".tabs" ).tabs();
    
            $( function() {
              $( "#datepicker" ).datepicker().datepicker("setDate", new Date()); // Todays Date as default value
              $( "#anim" ).on( "change", function() {
                $( "#datepicker" ).datepicker( "option", "showAnim", $( this ).val() );
              });
            } );
            $( function() {
              $( ".checkbox" ).checkboxradio({
                icon: false
              });
            } );
      
        },
    });

    $('.tabs').tabsilainen();

    // funktion som legger up ett nyt sektion 
    function addList() {
        bodyWidth = $("body").width();
        nextWidth = bodyWidth + 300;
        $('body').css('width', nextWidth + 'px');
        let listName = $('#listname').val();
        $("div.orders").append("<div class=\"column\">" +
                "<div class=\"box\" data-title=\"" + listName + "\">" +
                "<div class=\"header\">" +
                "    " + listName +
                "</div>" +
                "<div class=\"body\">" +
                "    <ul id=\"sortable3\" class=\"droptrue\">" +
                "    </ul>" +
                "</div>" +
                "</div></div>");
        
        initSortable();
        dialogList.dialog("close");


    }
    
    dialogList = $("#dialog-form-section").dialog({
        autoOpen: false,
        height: 250,
        width: 350,
        modal: true,
        buttons: {
            "Create new Section": addList,
            Cancel: function () {
                dialogList.dialog("close");
            }
        },
        close: function () {
//                        $("#dialog-form-list")[0].reset();
//                        allFields.removeClass("ui-state-error");
        }
        
    });



    //tabs, datapicker och ckebox funktionen
    $( function() {
    } );

    
    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addOrder();
    }),
    form = dialog.find("#formList").on("submit", function (event) {
        event.preventDefault();
        addList();
    });

    $("#btnCreateNewTask").button().on("click", function () {
        dialog.dialog("open");
    });
    $("#btnCreateNewSection").button().on("click", function () {
        dialogList.dialog("open");
    });

    $("#sortable3 > li").addClass('background-red');

   
});


