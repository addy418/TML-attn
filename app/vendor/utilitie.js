$(document).ready(function() {
	$("video").prop('muted', true); //mute
 // Select all tabs
    
            $('.nav-tabs a').click(function() {
                $(this).tab('show');
            })

            // Select tab by name
            $('.nav-tabs a[href="#home"]').tab('show')

            // Select first tab
            $('.nav-tabs a:first').tab('show')

            // Select last tab
            $('.nav-tabs a:last').tab('show')

            // Select fourth tab (zero-based)
            $('.nav-tabs li:eq(3) a').tab('show')


            $(".sub-selected-1").click(function() {
                $(".sub-selected-1").addClass("sub-selected-tab-1");
                $(".sub-selected-2").removeClass("sub-selected-tab-2");
                $(".sub-selected-3").removeClass("sub-selected-tab-3");
                $(".sub-selected-4").removeClass("sub-selected-tab-4");
                $(".sub-selected-5").removeClass("sub-selected-tab-5");
            });
            $(".sub-selected-2").click(function() {
                $(".sub-selected-2").addClass("sub-selected-tab-2");
                $(".sub-selected-1").removeClass("sub-selected-tab-1");
                $(".sub-selected-3").removeClass("sub-selected-tab-3");
                $(".sub-selected-4").removeClass("sub-selected-tab-4");
                $(".sub-selected-5").removeClass("sub-selected-tab-5");
            });
            $(".sub-selected-3").click(function() {
                $(".sub-selected-3").addClass("sub-selected-tab-3");
                $(".sub-selected-2").removeClass("sub-selected-tab-2");
                $(".sub-selected-1").removeClass("sub-selected-tab-1");
                $(".sub-selected-4").removeClass("sub-selected-tab-4");
                $(".sub-selected-5").removeClass("sub-selected-tab-5");

            });
            $(".sub-selected-4").click(function() {
                $(".sub-selected-4").addClass("sub-selected-tab-4");
                $(".sub-selected-2").removeClass("sub-selected-tab-2");
                $(".sub-selected-3").removeClass("sub-selected-tab-3");
                $(".sub-selected-1").removeClass("sub-selected-tab-1");
                $(".sub-selected-5").removeClass("sub-selected-tab-5");

            });
            $(".sub-selected-5").click(function() {
                $(".sub-selected-5").addClass("sub-selected-tab-5");
                $(".sub-selected-2").removeClass("sub-selected-tab-2");
                $(".sub-selected-3").removeClass("sub-selected-tab-3");
                $(".sub-selected-4").removeClass("sub-selected-tab-4");
                $(".sub-selected-1").removeClass("sub-selected-tab-1");

            });
         $("#myModal-alert").on("show", function() {    // wire up the OK button to dismiss the modal when shown
        $("#myModal-alert a.btn").on("click", function(e) {
            console.log("button pressed");   // just as an example...
            $("#myModal-alert").modal('hide');     // dismiss the dialog
        });
    });
    $("#myModal-alert").on("hide", function() {    // remove the event listeners when the dialog is dismissed
        $("#myModal-alert a.btn").off("click");
    });
    
    $("#myModal-alert").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#myModal-alert").remove();
    });
    
    $("#myModal-alert").modal({                    // wire up the actual modal functionality and show the dialog
      "backdrop"  : "static",
      "keyboard"  : true,
      "show"      : true                     // ensure the modal is shown immediately
    });
    
});



$(window).scroll(function() {
  if ($(document).scrollTop() > 250) {
      //alert();
    $('.navbar-fixed-padding').addClass('shrink');
  } else {
    $('.navbar-fixed-padding').removeClass('shrink');
  }
});
