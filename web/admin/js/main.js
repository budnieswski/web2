jQuery(function($){

  $.getScript("js/site/dialogs.js");
  $.getScript("js/site/functions.js");
  $.getScript("js/site/forms.js");
  $.getScript("js/site/triggers.js");

/* ==========================================================================
 Default
 ========================================================================== */
{

  $( "#wrap" ).tabs({ active: 0, show: { effect: "fade", duration: 500 } });
  $( ".menu-options li:last-child" ).css('float','right');
  $( "input[type=submit], button" ).button();
  $( ".accordion" ).accordion({
    heightStyle: "content",
      icons: {
        header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
      }
    });
  $( "input[class=data]" ).datepicker();
  $( ".styleTable" ).styleTable();
  
} // end <Default>;


})