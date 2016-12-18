/**
 * Created by YeWenting on 14/11/2016.
 */

$.validator.setDefaults({
    submitHandler: function() {
        alert("Add successfully!");
    }
});

$().ready(function(){
    $("#form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "div" )
                .append( error );
        },
        errorElement: "span"
    });
});
